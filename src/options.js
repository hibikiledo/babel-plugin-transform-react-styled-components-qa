import isString from 'lodash.isstring'
import camelCase from 'lodash.camelcase'
import kebabCase from 'lodash.kebabcase'
import snakeCase from 'lodash.snakecase'

export const getAttributeName = opts =>
	isString(opts.attribute) ? opts.attribute : 'data-qa'

const formattersByName = {
	camel: camelCase,
	kebab: kebabCase,
	snake: snakeCase,
}

export const getComponentNameFormatter = opts =>
	isString(opts.format) && opts.format in formattersByName
		? formattersByName[opts.format]
		: kebabCase
