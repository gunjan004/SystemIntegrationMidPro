const Joi = require('@hapi/joi');

const signUpValidation = (data) =>{
    const schema = Joi.object({
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        email : Joi.string().required().email(),
        password : Joi.string().required().min(6),
        gender : Joi.string().required(),
        contactNo : Joi.string().required().min(10).max(10)
    });
    return schema.validate(data);
};

const loginValidation = (data) =>{
    const schema = Joi.object({
        email : Joi.string().required().email(),
        password : Joi.string().required().min(6)
    });
    return schema.validate(data);
};

module.exports.signUpValidation = signUpValidation;
module.exports.loginValidation = loginValidation;
