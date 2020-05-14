"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComponentNameFormatter = exports.getAttributeName = void 0;

var _lodash = _interopRequireDefault(require("lodash.isstring"));

var _lodash2 = _interopRequireDefault(require("lodash.camelcase"));

var _lodash3 = _interopRequireDefault(require("lodash.kebabcase"));

var _lodash4 = _interopRequireDefault(require("lodash.snakecase"));

var _lodash5 = _interopRequireDefault(require("lodash.upperfirst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pascalCase = s => (0, _lodash5.default)((0, _lodash2.default)(s));

const getAttributeName = opts => (0, _lodash.default)(opts.attribute) ? opts.attribute : 'data-qa';

exports.getAttributeName = getAttributeName;
const formattersByName = {
  camel: _lodash2.default,
  kebab: _lodash3.default,
  snake: _lodash4.default,
  pascal: pascalCase
};

const getComponentNameFormatter = opts => (0, _lodash.default)(opts.format) && opts.format in formattersByName ? formattersByName[opts.format] : _lodash3.default;

exports.getComponentNameFormatter = getComponentNameFormatter;