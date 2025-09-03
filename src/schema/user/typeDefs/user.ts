import gql from "graphql-tag"


const typeDefs = gql`
type Query{
    user : User
}
type User{
    id : String
    name : String
    email : String
    password : String
}
type Mutation  {
    createUser (input : createUserInput) : result
    loginUser (input : loginUserInput ) : result
}
input createUserInput {
    name : String !
    email: String !
    password : String !
}
input loginUserInput{
    email: String!
    password : String!
}
type result {
    meta : messageUser
    data : token
}
type token{
    accessToken : String
}
type messageUser{
    statusCode : Int !
    message : String 
    isExisting : Boolean 
    isLogin : Boolean
    isAdded : Boolean
    undefinedUser : Boolean
}
`

export {typeDefs}