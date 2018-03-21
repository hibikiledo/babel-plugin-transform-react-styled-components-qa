export default function ({ types: t }) {
  return {
    visitor: {
      VariableDeclarator (path) {
        const init = path.node.init

        if (!t.isTaggedTemplateExpression(init)) {
          return
        }

        // tag part of the template literal
        const tag = init.tag

        // styled.div , styled.p , styled[<computed_value>], etc
        if (t.isMemberExpression(tag)) {
          const { object, property } = tag
          if (object.name === 'styled') {
            init.tag = t.callExpression(
              t.memberExpression(
                t.memberExpression(object, property, tag.computed),
                t.identifier('attrs')
              ),
              [
                t.objectExpression([
                  t.objectProperty(
                    t.stringLiteral('data-qa'),
                    t.stringLiteral(path.node.id.name)
                  )
                ])
              ]
            )
          }
        }

        if (t.isCallExpression(tag)) {
          // styled(Component)``
          if (t.isIdentifier(tag.callee) && tag.callee.name === 'styled') {
            init.tag = t.callExpression(
              t.memberExpression(tag, t.identifier('attrs')),
              [
                t.objectExpression([
                  t.objectProperty(
                    t.stringLiteral('data-qa'),
                    t.stringLiteral(path.node.id.name)
                  )
                ])
              ]
            )
          }

          // styled(Component).attrs({})
          if (
            t.isMemberExpression(tag.callee) &&
            t.isIdentifier(tag.callee.property) &&
            tag.callee.property.name === 'attrs' &&
            t.isCallExpression(tag.callee.object) &&
            t.isIdentifier(tag.callee.object.callee) &&
            tag.callee.object.callee.name === 'styled'
          ) {
            tag.arguments = [
              t.objectExpression(
                tag.arguments[0].properties.concat(
                  t.objectProperty(
                    t.stringLiteral('data-qa'),
                    t.stringLiteral(path.node.id.name)
                  )
                )
              )
            ]
          }

          // styled.div.attrs({})`` or styled[tag].attrs({})``
          if (
            t.isMemberExpression(tag.callee) &&
            t.isIdentifier(tag.callee.property) &&
            tag.callee.property.name === 'attrs' &&
            t.isMemberExpression(tag.callee.object) &&
            t.isIdentifier(tag.callee.object.object) &&
            tag.callee.object.object.name === 'styled'
          ) {
            tag.arguments = [
              t.objectExpression(
                tag.arguments[0].properties.concat(
                  t.objectProperty(
                    t.stringLiteral('data-qa'),
                    t.stringLiteral(path.node.id.name)
                  )
                )
              )
            ]
          }
        }
      }
    }
  }
}
