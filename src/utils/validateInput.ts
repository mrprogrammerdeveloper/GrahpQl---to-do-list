import Joi, { object } from "joi";

class validateInput{
    constructor(){

    }
    validateCreateUser(input : object) {
        const schema = Joi.object({
            name : Joi.string().max(30).required(),
            password : Joi.string().min(8).max(16).required(),
            email : Joi.string().email().required()
        })
        return schema.validate(input)
    }
    validateLoginUser(input : object){
        const schema = Joi.object({
            password : Joi.string().min(8).max(16).required(),
            email : Joi.string().email().required()
        })
        return schema.validate(input)
    }
}
export {validateInput}