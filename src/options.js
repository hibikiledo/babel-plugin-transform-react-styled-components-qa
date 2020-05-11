import isString from 'lodash.isstring'
import camelCase from 'lodash.camelcase'
import kebabCase from 'lodash.kebabcase'
import snakeCase from 'lodash.snakecase'
import upperFirst from 'lodash.upperfirst'

const pascalCase = s => upperFirst(camelCase(s))

export const getAttributeName = opts =>
	isString(opts.attribute) ? opts.attribute : 'data-qa'

const formattersByName = {
	camel: camelCase,
	kebab: kebabCase,
	snake: snakeCase,
	pascal: pascalCase,
}

export const getComponentNameFormatter = opts =>
	isString(opts.format) && opts.format in formattersByName
		? formattersByName[opts.format]
		: kebabCase
