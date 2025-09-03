import { connectDB, getRowGroup } from "../prisma/index";
import { addGroupInterface, addTaskInterface } from "../schema/interface/taskInterface";

const insertTask = async (input : addTaskInterface)=>{
    try {
        const client =  await connectDB()
        const groupExist = await client.group.findFirst({where :{projectName  : String(input.projectName)}})
        if(!groupExist){
            return {statusCode : 401 , taskCreated : false}
        }
        const s = await client.task.create({
            data : {
                name : String(input.name),
                description : String(input.description),
                imageUrl : String(input.imageUrl),
                startDate :  String(input.startDate),
                endDate : String(input.endDate),
                status : Boolean(input.status),
                group:{
                    connect:{id : groupExist.id}
                }
        }})
        return {statusCode : 200 , taskCreated : true}

    } catch (err) {
        if(err){
        return {statusCode : 500 , taskCreated : false}

        }
    }
}
const createGroupDB = async(input : addGroupInterface)=>{
    try {
        const client =  await connectDB()
        const groupExist = await client.group.findUnique({where :{projectName  : String(input.projectName)}})
        if(groupExist){
            return {statusCode : 200 , groupExist : true}
        }

        await client.group.create({
            data:{
                projectName : String(input.projectName),
                groupType : String(input.groupType),
                taskNumber : input.taskNumber,
                progressPecantage : input.progressPrcentage,
                iconUrl : String(input.iconUrl)
            }
        })
        
    } catch (error) {
        if(error){
            return {statusCode : 500 , groupCreated : false}
        }   
    }
    return {statusCode : 200 , groupCreated : true}
}
export {insertTask , createGroupDB }