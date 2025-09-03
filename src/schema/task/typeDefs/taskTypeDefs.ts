import gql from "graphql-tag";

const typeDefs = gql`
type Query {
    getTaskByDate(date : String , email:String)  : Result
    getAllTaskByGroup(groupName : String , email : String) : Result
    getAllGroupe : Result
}
type Task {
    id : String
    name : String 
    description : String
    startDate : String
    endDate : String
    imageUrl : String
    status : Boolean
    taskId : String
}
type Group{
    id : String
    projectName : String 
    taskNumber : Int 
    progressPrcentage : Int 
    groupType : String
    iconUrl : String
}
type Result{
    meta : message !
    data : resultData
}

type resultData {
    groupData : [Group]
    taskData : [Task]
    token : String
}
type Mutation{
    addTask (input : inputTask) : Result
    createGroup (input : inputGroup) : Result
}
input inputTask{
    email:String
    projectName : String!
    name : String !
    description : String!
    startDate :String !
    endDate : String !
    imageUrl : String!
    status : Boolean!
}
input inputGroup{
    email:String
    projectName : String !
    taskNumber : Int !
    progressPrcentage : Int !
    groupType : String!
    iconUrl : String!
}
type message{
    statusCode : Int !
    taskCreated : Boolean
    groupCreated : Boolean
    accessTokenExpired : Boolean
    sessionExpired : Boolean
    groupExist : Boolean
}
`
export {typeDefs}