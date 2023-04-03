const { gql } = require('apollo-server-exress');

const typeDefs = gql`
type Book {
    bookId: ID
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
}

type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}

input Bookinput {
    bookId: ID
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
}

type Auth {
    token: ID
    user: User
}
type Query {
    me: User
    user(username: String, _id: ID): User
    users: [User]
}
type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: Bookinput!): User
}
`;

module.exports = typeDefs;