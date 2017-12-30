import { GraphQLScalarType, GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { Kind } from 'graphql/language';
import url, { URL } from 'url';
const URLType = new GraphQLScalarType({
  name: 'URL',
  description: 'representation of an endpoint on the web',

  serialize(value) {
    return String(value);
  },

  parseValue(value) {
    let result = value.toString();
    return new URL(result);
  },

  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
        if (ast.value.length > 0) {
          return new URL(ast.value);
        }

        return null;

      default:
        return null;
    }
  }

});
const schemaString = `scalar URL `;
const resolverFunctions = {
  URL: URLType
};
const definition = {
  typeDefs: schemaString,
  resolvers: resolverFunctions
};
const jsSchema = makeExecutableSchema(definition);
export default [schemaString];