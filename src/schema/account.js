// @flow
import URLType from './url';

export interface IAccount {
    id: string,
    uid: string,
    displayName: string,
    photoURL: string,
    emailAddress: string,
    phoneNumber: string
}

const Account = `
type Account {
    id: String!
    uid: String!
    displayName: String!
    photoURL: String!
    emailAddress: String!
    phoneNumber: String!
}
`

module.exports = {
    Account
};