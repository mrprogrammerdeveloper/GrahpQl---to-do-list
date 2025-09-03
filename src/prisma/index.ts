import { PrismaClient } from "./generated/prisma";
import { createUserInterface, messageUserInterface } from "../schema/interface/userInterface";
import { hashPassword } from "../utils/passwordHash";

const connectDB = async()=>{
    const client = new PrismaClient()
    try{
        client.$connect()
    }catch(err){
        if(err) throw err
        else console.log('DbConnected')
    }
    return client
}

const getRowUser = async (searchCondition : object | undefined) => {
     let user = null
    const client = await connectDB()
    if(typeof searchCondition == "object" ){
        user = await client.user.findFirst({where:searchCondition})
    }else{
        user = await client.user.findMany({where:searchCondition})
    }
    return user
}
const getRowTask = async (searchCondition ?: object | undefined) => {
     let task = null
    const client = await connectDB()
    if(typeof searchCondition == "object" ){
        task = await client.task.findFirst({where:searchCondition})
    }else{
        task = await client.task.findMany({where:searchCondition})
    }
    return task
}
const getRowGroup = async (searchCondition ?: object) => {
    let group 
    const client = await connectDB()
    if(typeof searchCondition == "object" ){
        group = await client.group.findFirst({where:searchCondition})
    }else{
        group = await client.group.findMany()
    }
    return group
}
const updateRowToken = async(uuid : string , data : object)=>{
    try{
        const client = await connectDB()
        await client.token.update({where : {userId : uuid}  , data : data})
        return true
    }catch(err){
        if(err) return false
    }
}
const getAllTaskByGroupDB =async(groupName : String)=>{
    let group 
    try{
        const client = await connectDB()
        group = await client.group.findUnique({where:{projectName : String(groupName) } , include : {task : true}})
        return group?.task
    }catch(err){
        console.log(err)
    }
}

export {getRowUser ,getRowTask, connectDB , updateRowToken , getRowGroup , getAllTaskByGroupDB}