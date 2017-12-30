// @flow
var tools = require ('graphql-tools');
var acc =require('./account');
var fs = require('fs-extra');
var regeneratorRuntime = require('regenerator-runtime')

const DATAFILE = 'c:\\Users\\bobby\\Desktop\\data.json';
async function getData(): Promise<acc.IAccount[]> {
    try {
        var data = await fs.readFile(DATAFILE)
    } catch (error) {
        var startData: acc.IAccount = { id: '1', uid: '1', photoURL: 'no-photo', displayName: 'SADMIN', emailAddress: 'sadmin@smartspaces.com', phoneNumber: '800-555-1212' }
        var data = JSON.stringify([ startData ]);
    }
    return Promise.resolve(JSON.parse(data.toString()));
}

var accountData = [];
getData().then(x => accountData = x).catch(err => console.log(`ERROR: ${err.message}`));
if (accountData.length === 0) { accountData = [ { id: '1', uid: '1', photoURL: '', displayName: '', emailAddress: '', phoneNumber: '' } ];}
const resolvers = {
    Query: {
        account: (_, uid: string) => accountData.filter((v) => v.uid === uid),
        allAccounts: () => accountData,
        exists: (_, uid: string) => accountData.filter((v) => v.uid === uid).length > 0
    },
    Mutation: {
        addAccount: (_, { uid, displayName, photoURL, emailAddress, phoneNumber }) => {
            var id = accountData.length + 1
            accountData = accountData.concat([ { id, uid, displayName, emailAddress, photoURL, phoneNumber } ]) 
            return { id, uid, displayName, emailAddress, photoURL, phoneNumber };
        }
    }
}

var typeDefs = `
${acc.Account}

type Query {
    account(uid: String!): Account
    allAccounts: [Account]
    exists(uid: String!): Boolean
}

type Mutation {
    addAccount(uid: String!, displayName: String!, photoURL: String!, emailAddress: String!, phoneNumber: String!): Account
}
`
const schema = tools.makeExecutableSchema({ typeDefs, resolvers });

module.exports = {
    schema,
    DATAFILE,
    accountData
}