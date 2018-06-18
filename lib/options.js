'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComponentNameFormatter = exports.getAttributeName = undefined;

var _lodash = require('lodash.isstring');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.camelcase');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.kebabcase');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.snakecase');

var _lodash8 = _interopRequireDefault(_lodash7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAttributeName = exports.getAttributeName = opts => (0, _lodash2.default)(opts.attribute) ? opts.attribute : 'data-qa';

const formattersByName = {
  camel: _lodash4.default,
  kebab: _lodash6.default,
  snake: _lodash8.default
};

const getComponentNameFormatter = exports.getComponentNameFormatter = opts => (0, _lodash2.default)(opts.format) && opts.format in formattersByName ? formattersByName[opts.format] : _lodash6.default;