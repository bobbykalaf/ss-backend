'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _graphqlTools = require('graphql-tools');

var _language = require('graphql/language');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


var schemaString = 'scalar URL ';

var resolverFunctions = {
    URL: URLType
};

var definition = { typeDefs: schemaString, resolvers: resolverFunctions };
var jsSchema = (0, _graphqlTools.makeExecutableSchema)(definition);

exports.default = [schemaString];