function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var tools = require('graphql-tools');
var regeneratorRuntime = require('regenerator-runtime')
var acc = require('./account');

var fs = require('fs-extra');

var DATAFILE = "c:\\Users\\bobby\\Desktop\\data.json";

function getData() {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
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
            _context.t0 = _context["catch"](0);
            startData = {
              id: '',
              uid: '',
              photoURL: '',
              displayName: '',
              emailAddress: '',
              phoneNumber: ''
            };
            data = JSON.stringify([startData]);

          case 10:
            return _context.abrupt("return", Promise.resolve(JSON.parse(data.toString())));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 6]]);
  }));
  return _getData.apply(this, arguments);
}

var accountData = [];
getData().then(function (x) {
  return accountData = x;
}).catch(function (err) {
  return console.log("ERROR: ".concat(err.message));
});

if (accountData.length === 0) {
  accountData = [{
    id: 1,
    uid: '',
    photoURL: '',
    displayName: '',
    emailAddress: '',
    phoneNumber: ''
  }];
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
    addAccount: function addAccount(_, _ref) {
      var uid = _ref.uid,
          displayName = _ref.displayName,
          photoURL = _ref.photoURL,
          emailAddress = _ref.emailAddress,
          phoneNumber = _ref.phoneNumber;
      var id = accountData.length + 1;
      accountData = accountData.concat([{
        id: id,
        uid: uid,
        displayName: displayName,
        emailAddress: emailAddress,
        photoURL: photoURL,
        phoneNumber: phoneNumber
      }]);
      return {
        id: id,
        uid: uid,
        displayName: displayName,
        emailAddress: emailAddress,
        photoURL: photoURL,
        phoneNumber: phoneNumber
      };
    }
  }
};
var typeDefs = "\n".concat(acc.Account, "\n\ntype Query {\n    account(uid: String!): Account\n    allAccounts: [Account]\n    exists(uid: String!): Boolean\n}\n\ntype Mutation {\n    addAccount(uid: String!, displayName: String!, photoURL: String!, emailAddress: String!, phoneNumber: String!): Account\n}\n");
var schema = tools.makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});
module.exports = {
  schema: schema,
  DATAFILE: DATAFILE,
  accountData: accountData
};