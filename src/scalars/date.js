// @flow
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const fromStringToInt = (value: string) => Date.parse(value);
const intToDate = (intValue: number) => new Date(intValue);
const dateToString = (date: Date) => date.toUTCString();

const DateType = new GraphQLScalarType({
    name: 'Date',
    description: 'represents a calendar date and time',
    serialize(value: any) {
        return new Date(Date.parse(value.toString())).toUTCString();
    },
    parseValue(value: any): Date {
        let result = new Date(Date.parse(value.toString()));
        return result;
    },
    parseLiteral(ast) {
        switch (Kind.STRING) {
            case value:
                
                break;
        
            default:
                break;
        }
    }

})