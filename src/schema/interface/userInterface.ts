interface createUserInterface {
    name : string, 
    email: string, 
    password : string
}
interface loginUserInterface{
    email: string , 
    password : String
}

interface messageUserInterface{
    statusCode : number ,
    message?: String ,
    isExisting?: Boolean ,
    isLogin?: Boolean,
    isAdded?: Boolean
}
export {createUserInterface , messageUserInterface , loginUserInterface}