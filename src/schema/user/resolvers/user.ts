import {getRowUser } from "../../../prisma"
import { addUser, loginUser } from "../../../services/authService"
import { createUserInterface, loginUserInterface } from "../../interface/userInterface"


const resolvers = {
    Query : {
        user : async ()=>{
            const user = await getRowUser({email : "rezaazizian197@gmail.com"})
            return user
        }
    },
    Mutation :{
        createUser : async (_ : any , args : {input : createUserInterface})=>{
            const result = await addUser(args.input)
            return result
        },
        loginUser : async(_ : any , args : {input : loginUserInterface})=>{
            const result = await loginUser(args.input)
            return result
        }
    }
}
export {resolvers}
