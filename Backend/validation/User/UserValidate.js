const Joi = require('joi');

const UserValidate = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
     avatar: Joi.optional() , 
     address:Joi.string().required(),
     phone:Joi.number().required()  
})

module.exports = UserValidate;



// Also -

// try {
//     const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { }
