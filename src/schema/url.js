// @flow
import { GraphQLScalarType, type GraphQLScalarTypeConfig, GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { type IExecutableSchemaDefinition, type IResolvers } from 'graphql-tools';
import { Kind } from 'graphql/language';
import url, { URL } from 'url';

const URLType = new GraphQLScalarType(({
    name: 'URL',
    description: 'representation of an endpoint on the web',
    serialize(value) {
        return String(value);
    },
    parseValue(value: any): URL {
        let result: string = value.toString();
        return new URL(result);
    },
    parseLiteral(ast): URL | null  {
        switch (ast.kind) {
            case Kind.STRING:                
                if (ast.value.length > 0) { return new URL(ast.value); }
                return null;
            default:
                return null;
        }
    }
} : GraphQLScalarTypeConfig<URL | null, string>));

const schemaString = `scalar URL `;

const resolverFunctions: IResolvers = {
    URL: URLType
}

const definition: IExecutableSchemaDefinition = { typeDefs: schemaString, resolvers: resolverFunctions };
const jsSchema: GraphQLSchema = makeExecutableSchema(definition);

export default [ schemaString ];