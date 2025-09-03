import { connectDB } from "../prisma"
import { createTokenJwt, verifyToken } from "../utils/jwtService"

const sessionVerify = async(accessToken : String,email : String )=>{
    const accessTokenVerify =await verifyToken(accessToken)
    if(accessTokenVerify){
        return {statusCode : 200, sessionExpired : false , token : null} 
    }
    try {
        const client = await connectDB()
        const refreshTokenUser = await client.user.findUnique({where : {email: String(email)} , include : {token : true}})

        const refreshTokenVerify = await verifyToken(String(refreshTokenUser?.token?.refreshToken))
        if(refreshTokenVerify == false){
            return {statusCode : 200,sessionExpired : true , token : null} 
        }
        const payload = {
        }
        const newAccessToken = await createTokenJwt(payload , 60)
        if(newAccessToken){
            return {statusCode : 200, sessionExpired : false , token : newAccessToken} 
        }
         

        
    } catch (error) {
        if(error){
            return {statusCode : 500} 
        }
    }
    return {statusCode : 500}
}
export {sessionVerify}