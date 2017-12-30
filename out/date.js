import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const fromStringToInt = value => Date.parse(value);

const intToDate = intValue => new Date(intValue);

const dateToString = date => date.toUTCString();

const DateType = new GraphQLScalarType({
  name: 'Date',
  description: 'represents a calendar date and time',

  serialize(value) {
    return new Date(Date.parse(value.toString())).toUTCString();
  },

  parseValue(value) {
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

});