"use strict";

var _url = _interopRequireDefault(require("./url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Account = "\ntype Account {\n    id: String!\n    uid: String!\n    displayName: String!\n    photoURL: String!\n    emailAddress: String!\n    phoneNumber: String!\n}\n";
module.exports = {
  Account: Account
};