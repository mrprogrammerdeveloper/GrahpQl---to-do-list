import { connectDB, getRowUser, updateRowToken } from "../prisma/index"
import { createUserInterface, loginUserInterface } from "../schema/interface/userInterface"
import { createTokenJwt } from "../utils/jwtService"
import { hashPassword, verifyPassword } from "../utils/passwordHash"
import { validateInput } from "../utils/validateInput"


const addUser = async (input : createUserInterface)  =>{
    try{
        const validate = new validateInput()
        const validateInputUser = validate.validateCreateUser((input))

        if(validateInputUser.error){
            return {meta : {statusCode : 400 , message : validateInputUser.error }}
        }
        const client = await connectDB()
        const password = await hashPassword(input.password)
        try{
            const existingUser = await client.user.findUnique({where : {email : input.email}})
            if(existingUser){
                return {meta : { statusCode : 401 , isExisting : true}}

            }
        }catch(err){
            if(err){
                return {meta : {message : String(err) , statuscode : 500}}
            }
        }
        const payload = {
            role : "admin",
            // exp : Math.floor(Date.now()/1000)+(30*24*60*60)
        }
        const refreshTokenJwt = await createTokenJwt(payload , (30*24*60*60))
        if(!refreshTokenJwt){
            return {meta : {statusCode : 500}}
        }
        await client.user.create({
                data:{
                    name : input.name,
                    email: input.email,
                    password: password,
                    token:{
                        create:{
                            refreshToken : refreshTokenJwt,
                            exp : Math.floor(Date.now()/1000)+(30*24*60*60),
                            status : "active"
                        }
                    }
                }
            })
        }catch (err){
            if(err){
                return {meta: {message : String(err) , statusCode : 500}}
            }
        }
        return {meta : { statusCode : 200 , isAdded : true}}
}

const loginUser = async(input : loginUserInterface)=>{
    
    try{
        const validate = new validateInput()
        const validateInputUser = validate.validateLoginUser((input))

        if(validateInputUser.error){
            return {meta : {statusCode : 400 , message : validateInputUser.error }}
        }
        const client = await connectDB()
        const existingUser = await client.user.findUnique({where : {email : input.email} , select : {id : true ,email : true , password : true}})
        if(!existingUser){
            return {meta: { statusCode : 401 , undefinedUser : true}}
        }
       
        const verifiedPassword = await verifyPassword(existingUser.password , String(input.password))
        if(!verifiedPassword){
            return {meta : {statusCode : 401 , isLogin : false}}
        }
        const userToken = await client.token.findUnique({where : {userId : existingUser.id}})
        const payload = {
            role : "admin",
            // exp : Math.floor(Date.now()/1000)+(30*24*60*60)

        }
        if(userToken && Math.floor(Date.now()/1000) > userToken?.exp){
            const refreshTokenJwt = await createTokenJwt(payload , (30*24*60*60))
            const updateDB =await updateRowToken(existingUser.id  , {refreshToken : refreshTokenJwt})
            if(!updateDB){
                return {meta : {statusCode : 500 , message : "database not connected"}}
            }
        }
        const accessTokenJwt = await createTokenJwt(payload ,  (60))
        return {meta : {statusCode : 200 , isLogin : true }, data : { accessToken : accessTokenJwt}}
       
    }catch(err){
        console.log(err)
        if(err) return {meta : {statuscode : 500}}
    }
}


export {addUser ,loginUser}