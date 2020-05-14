"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _options = require("./options");

var babelType = _interopRequireWildcard(require("@babel/types"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 *
 * @param {{ types: typeof babelType }}
 */
function _default({
  types: t
}) {
  return {
    visitor: {
      VariableDeclarator(path, state) {
        const init = path.node.init;

        if (!t.isTaggedTemplateExpression(init)) {
          return;
        }

        const format = (0, _options.getComponentNameFormatter)(state.opts);
        const attributeName = (0, _options.getAttributeName)(state.opts); // tag part of the template literal

        const tag = init.tag; // styled.div , styled.p , styled[<computed_value>], etc

        if (t.isMemberExpression(tag)) {
          const {
            object,
            property
          } = tag;

          if (object.name === 'styled') {
            init.tag = t.callExpression(t.memberExpression(t.memberExpression(object, property, tag.computed), t.identifier('attrs')), [t.arrowFunctionExpression([t.identifier('props')], t.blockStatement([t.returnStatement(t.objectExpression([t.objectProperty(t.stringLiteral(attributeName), t.logicalExpression('||', t.memberExpression(t.identifier('props'), t.stringLiteral(attributeName), true), t.stringLiteral(format(path.node.id.name))))]))]))]);
          }
        }

        if (t.isCallExpression(tag)) {
          // styled.div.attrs({}) or styled[tag].attrs({})
          if (t.isMemberExpression(tag.callee) && t.isIdentifier(tag.callee.property) && tag.callee.property.name === 'attrs' && t.isMemberExpression(tag.callee.object) && t.isIdentifier(tag.callee.object.object) && tag.callee.object.object.name === 'styled') {
            tag.arguments = [t.arrowFunctionExpression([t.identifier('props')], t.blockStatement([t.returnStatement(t.objectExpression(tag.arguments[0].properties.concat(t.objectProperty(t.stringLiteral(attributeName), t.logicalExpression('||', t.memberExpression(t.identifier('props'), t.stringLiteral(attributeName), true), t.stringLiteral(format(path.node.id.name)))))))]))];
          }
        }
      }

    }
  };
}