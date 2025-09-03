import {hash, verify} from "argon2";

const hashPassword = async(password : string)=>{
    const hashedPasssword = await hash(password)
    return hashedPasssword
}

const verifyPassword = async(storedPassword : string , password : string)=>{
    const verified = await verify(storedPassword , password)
    return verified
}

export {hashPassword ,verifyPassword}