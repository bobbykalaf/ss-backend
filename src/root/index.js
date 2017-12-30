// @flow
var express = require('express');
var bodyParser = require('body-parser');
var graphqlExpress = require('apollo-server-express')
var polyfill = require('babel-polyfill');
var fs = require('fs-extra');
var index = require('./schema/index');

console.log('alpha');

const schema = index.schema;
const PORT = 3000;

const app = express();
console.log('beta');

app.use('/graphql', bodyParser.json(), graphqlExpress.graphqlExpress({ schema: schema }));
app.use('/iql', graphqlExpress.graphiqlExpress())
var server = app.listen(PORT);
console.log('delta');

var dispose = () => {
    try {
        console.log('writing file')
        fs.writeJSON(index.DATAFILE, index.accountData).then(() => server.close());
    } catch (error) {
        console.log(`ERROR SAVING ACCOUNT DATA`);
    }    
}
console.log('gamma');
server.on('close', dispose);
app.listen(PORT)