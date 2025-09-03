import { getAllTaskByGroupDB, getRowGroup, getRowTask } from "../../../prisma/index"
import { sessionVerify } from "../../../services/sessionService"
import { createGroupDB, insertTask } from "../../../services/taskService"
import { addGroupInterface, addTaskInterface } from "../../interface/taskInterface"

const resolvers = {
    Query : {
        getTaskByDate : async(_ : any , args : {date : String , email : String}, context : {token : String})=>{
            const verify = await sessionVerify(context.token , args.email)
            if(verify?.sessionExpired){
                return {meta : verify}
            }
            const task = await getRowTask({date : args.date})
            if(verify.token){
                return {
                    meta : {statusCode : 200 , accessTokenExpired : true} ,
                    data : {task : task  , token : verify.token}
                }
            }
            
            return {
                    meta : {statusCode : 200 , accessTokenExpired : false} ,
                    data : {task : task }
                }
            
        },
        getAllTaskByGroup : async(_: any , args : {groupName : String , email:String}, context : {token : String})=>{
            const verify = await sessionVerify(context.token , args.email)
            if(verify?.sessionExpired){
                return {meta : verify}
            }
            const task = await getAllTaskByGroupDB(args.groupName)
            if(verify.token){
                return {
                    meta : {statusCode : 200 , accessTokenExpired : true} ,
                    data : {taskData : task  , token : verify.token}
                }
            }
            
            return {
                    meta : {statusCode : 200 , accessTokenExpired : false} ,
                    data : {task : task }
                }
            
            console.log(task)
        },
        getAllGroupe:async(_:any ,args : {email : String} , context : {token : String})=>{
            const verify = await sessionVerify(context.token , args.email)
            if(verify?.sessionExpired){
                return {meta : verify}
            }
            const group = await getRowGroup()
            if(verify.token){
                return {
                    meta : {statusCode : 200 , accessTokenExpired : true} ,
                    data : {group : group  , token : verify.token}
                }
            }
            
            return {
                    meta : {statusCode : 200 , accessTokenExpired : false} ,
                    data : {group : group }
                }
        }
    },
    Mutation:{
        addTask : async(_:any , args : {input : addTaskInterface}, context : {token : String})=>{
            const verify = await sessionVerify(context.token , args.input.email)
            if(verify?.sessionExpired ){
                return {meta : verify}
            }
            if(verify.token ){
                return {
                    meta : {statusCode : 200 , accessTokenExpired : true , taskCreated : true} ,
                    data : { token : verify.token}
                }
            }

            const result = await insertTask(args.input)
            if(result?.statusCode != 200 || !result.taskCreated){
                return {meta : result}
            }
            
            
            return {
                    meta : {statusCode : 200 , accessTokenExpired : false , taskCreated : true} ,
                }
        },
        createGroup : async(_:any , args : {input : addGroupInterface}, context : {token : String})=>{
            const verify = await sessionVerify(context.token , args.input.email)
            if(verify?.sessionExpired){
                return {meta : verify}
            }
            if(verify.token ){
                return {
                    meta : {statusCode : 200 , accessTokenExpired : true , groupCreated : true} ,
                    data : { token : verify.token}
                }
            }
            const result = await createGroupDB(args.input)
            if(result?.statusCode != 200 || !result.groupCreated || !result.groupExist){
                return {meta : result}
            }
            
            return {
                    meta : {statusCode : 200 , accessTokenExpired : false , groupCreated : true} ,
                }
            
        }

    },


}
export {resolvers}