'use strict';

var getData = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data, startData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return fs.readFile(DATAFILE);

                    case 3:
                        data = _context.sent;
                        _context.next = 10;
                        break;

                    case 6:
                        _context.prev = 6;
                        _context.t0 = _context['catch'](0);
                        startData = { id: '1', uid: '1', photoURL: 'no-photo', displayName: 'SADMIN', emailAddress: 'sadmin@smartspaces.com', phoneNumber: '800-555-1212' };
                        data = JSON.stringify([startData]);

                    case 10:
                        return _context.abrupt('return', Promise.resolve(JSON.parse(data.toString())));

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 6]]);
    }));

    return function getData() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var tools = require('graphql-tools');
var acc = require('./account');
var fs = require('fs-extra');
var regeneratorRuntime = require('regenerator-runtime');

var DATAFILE = 'c:\\Users\\bobby\\Desktop\\data.json';


var accountData = [];
getData().then(function (x) {
    return accountData = x;
}).catch(function (err) {
    return console.log('ERROR: ' + err.message);
});
if (accountData.length === 0) {
    accountData = [{ id: '1', uid: '1', photoURL: '', displayName: '', emailAddress: '', phoneNumber: '' }];
}
var resolvers = {
    Query: {
        account: function account(_, uid) {
            return accountData.filter(function (v) {
                return v.uid === uid;
            });
        },
        allAccounts: function allAccounts() {
            return accountData;
        },
        exists: function exists(_, uid) {
            return accountData.filter(function (v) {
                return v.uid === uid;
            }).length > 0;
        }
    },
    Mutation: {
        addAccount: function addAccount(_, _ref2) {
            var uid = _ref2.uid,
                displayName = _ref2.displayName,
                photoURL = _ref2.photoURL,
                emailAddress = _ref2.emailAddress,
                phoneNumber = _ref2.phoneNumber;

            var id = accountData.length + 1;
            accountData = accountData.concat([{ id: id, uid: uid, displayName: displayName, emailAddress: emailAddress, photoURL: photoURL, phoneNumber: phoneNumber }]);
            return { id: id, uid: uid, displayName: displayName, emailAddress: emailAddress, photoURL: photoURL, phoneNumber: phoneNumber };
        }
    }
};

var typeDefs = '\n' + acc.Account + '\n\ntype Query {\n    account(uid: String!): Account\n    allAccounts: [Account]\n    exists(uid: String!): Boolean\n}\n\ntype Mutation {\n    addAccount(uid: String!, displayName: String!, photoURL: String!, emailAddress: String!, phoneNumber: String!): Account\n}\n';
var schema = tools.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });

module.exports = {
    schema: schema,
    DATAFILE: DATAFILE,
    accountData: accountData
};