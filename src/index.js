import { getAttributeName, getComponentNameFormatter } from './options'

import * as babelType from '@babel/types'

/**
 *
 * @param {{ types: typeof babelType }}
 */
export default function({ types: t }) {
	return {
		visitor: {
			VariableDeclarator(path, state) {
				const init = path.node.init

				if (!t.isTaggedTemplateExpression(init)) {
					return
				}

				const format = getComponentNameFormatter(state.opts)
				const attributeName = getAttributeName(state.opts)

				// tag part of the template literal
				const tag = init.tag

				// styled.div , styled.p , styled[<computed_value>], etc
				if (t.isMemberExpression(tag)) {
					const { object, property } = tag
					if (object.name === 'styled') {
						init.tag = t.callExpression(
							t.memberExpression(
								t.memberExpression(object, property, tag.computed),
								t.identifier('attrs'),
							),
							[
								t.arrowFunctionExpression(
									[t.identifier('props')],
									t.blockStatement([
										t.returnStatement(
											t.objectExpression([
												t.objectProperty(
													t.stringLiteral(attributeName),
													t.logicalExpression(
														'||',
														t.memberExpression(
															t.identifier('props'),
															t.stringLiteral(attributeName),
															true,
														),
														t.stringLiteral(format(path.node.id.name)),
													),
												),
											]),
										),
									]),
								),
							],
						)
					}
				}
				if (t.isCallExpression(tag)) {
					// styled.div.attrs({}) or styled[tag].attrs({})
					if (
						t.isMemberExpression(tag.callee) &&
						t.isIdentifier(tag.callee.property) &&
						tag.callee.property.name === 'attrs' &&
						t.isMemberExpression(tag.callee.object) &&
						t.isIdentifier(tag.callee.object.object) &&
						tag.callee.object.object.name === 'styled'
					) {
						tag.arguments = [
							t.arrowFunctionExpression(
								[t.identifier('props')],
								t.blockStatement([
									t.returnStatement(
										t.objectExpression(
											tag.arguments[0].properties.concat(
												t.objectProperty(
													t.stringLiteral(attributeName),
													t.logicalExpression(
														'||',
														t.memberExpression(
															t.identifier('props'),
															t.stringLiteral(attributeName),
															true,
														),
														t.stringLiteral(format(path.node.id.name)),
													),
												),
											),
										),
									),
								]),
							),
						]
					}
				}
			},
		},
	}
}
