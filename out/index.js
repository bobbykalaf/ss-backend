var express = require('express');

var bodyParser = require('body-parser');

var graphqlExpress = require('apollo-server-express');

var fs = require('fs-extra');

var index = require('./schema/index');

console.log('alpha');
var schema = index.schema;
var PORT = 3001;
var app = express();
console.log('beta');
app.use('/graphql', bodyParser.json(), graphqlExpress.graphqlExpress({
  schema: schema
}));
app.use('/iql', graphqlExpress.graphiqlExpress());
var server = app.listen(PORT);
console.log('delta');

var dispose = function dispose() {
  try {
    fs.writeJSONSync(index.DATAFILE, index.accountData);
  } catch (error) {
    console.log("ERROR SAVING ACCOUNT DATA");
  }
};

console.log('gamma');
server.on('close', dispose);