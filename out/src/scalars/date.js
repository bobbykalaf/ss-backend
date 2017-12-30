'use strict';

var _graphql = require('graphql');

var _language = require('graphql/language');

var fromStringToInt = function fromStringToInt(value) {
    return Date.parse(value);
};
var intToDate = function intToDate(intValue) {
    return new Date(intValue);
};
var dateToString = function dateToString(date) {
    return date.toUTCString();
};

var DateType = new _graphql.GraphQLScalarType({
    name: 'Date',
    description: 'represents a calendar date and time',
    serialize: function serialize(value) {
        return new Date(Date.parse(value.toString())).toUTCString();
    },
    parseValue: function parseValue(value) {
        var result = new Date(Date.parse(value.toString()));
        return result;
    },
    parseLiteral: function parseLiteral(ast) {
        switch (_language.Kind.STRING) {
            case value:

                break;

            default:
                break;
        }
    }
});