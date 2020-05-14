import pluginTester from 'babel-plugin-tester'

import path from 'path'

import plugin from '../src/index'

const common = {
	plugin,
	pluginName: 'babel-plugin-transform-react-styled-components-qa',
	tests: [
		{
			fixture: path.join(__dirname, '__fixtures__', 'code'),
			snapshot: true,
		},
	],
}

pluginTester({
	...common,
	title: 'without plugin options',
})

pluginTester({
	...common,
	title: 'format kebab',
	pluginOptions: {
		format: 'kebab',
	},
})

pluginTester({
	...common,
	title: 'format camel',
	pluginOptions: {
		format: 'camel',
	},
})

pluginTester({
	...common,
	title: 'format snake',
	pluginOptions: {
		format: 'snake',
	},
})

pluginTester({
	...common,
	title: 'format pascal',
	pluginOptions: {
		format: 'pascal',
	},
})

pluginTester({
	...common,
	title: 'custom attrubute',
	pluginOptions: {
		attribute: 'data-wn-qa',
	},
})
