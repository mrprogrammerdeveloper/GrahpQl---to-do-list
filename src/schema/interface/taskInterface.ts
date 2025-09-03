interface addTaskInterface{
    email : String
    projectName : String
    name : String 
    description : String
    startDate : String
    endDate : String
    imageUrl : String
    status : Boolean 
}
enum groupType{
    'work' , 
    'todo'
}
interface addGroupInterface{
    email:String ,
    projectName : String , 
    groupType : groupType,
    taskNumber : number,
    progressPrcentage : number,
    iconUrl : String
}
export {addTaskInterface ,addGroupInterface }