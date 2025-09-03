import jwt , { sign, SignOptions } from "jsonwebtoken";


const createTokenJwt = async (payload : object , expTime ?: number)=>{
    const options :SignOptions  ={
        expiresIn : expTime , 
        algorithm  :"HS256"
    }
    const api_key = "api_key" 
    let token : string
    try{
        token = await jwt.sign(payload , api_key , options )
        return token
    }catch(err){
       if(err) console.log(err)
    }

}

const verifyToken = async (token : String)=>{
    const options :SignOptions  ={
        algorithm  :"HS256"
    }
    const api_key = "api_key"
    let data
    try{
        data = await jwt.verify(String(token) , api_key , options)
        return data
    }catch(err){
        return false
    }
    
}

const refreshTokenJWTVerify = async(accessToken : String , refreshToken : String , payload : object)=>{
    const refreshTokenVerify = await verifyToken(refreshToken)
    if(!refreshTokenVerify){
        return false
    }
    const accessTokenVerify = await verifyToken(accessToken)
    if(!accessTokenVerify){
        const token = await createTokenJwt(payload)
        return token
    }
    return true
}
export {createTokenJwt , refreshTokenJWTVerify , verifyToken} 