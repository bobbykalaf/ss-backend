"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphql = require("graphql");

var _graphqlTools = require("graphql-tools");

var _language = require("graphql/language");

var _url = _interopRequireWildcard(require("url"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var URLType = new _graphql.GraphQLScalarType({
  name: 'URL',
  description: 'representation of an endpoint on the web',
  serialize: function serialize(value) {
    return String(value);
  },
  parseValue: function parseValue(value) {
    var result = value.toString();
    return new _url.URL(result);
  },
  parseLiteral: function parseLiteral(ast) {
    switch (ast.kind) {
      case _language.Kind.STRING:
        if (ast.value.length > 0) {
          return new _url.URL(ast.value);
        }

        return null;

      default:
        return null;
    }
  }
});
var schemaString = "scalar URL ";
var resolverFunctions = {
  URL: URLType
};
var definition = {
  typeDefs: schemaString,
  resolvers: resolverFunctions
};
var jsSchema = (0, _graphqlTools.makeExecutableSchema)(definition);
var _default = [schemaString];
exports.default = _default;