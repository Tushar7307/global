const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:50
    },
    email:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:1024
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:6,
        max:1024
    }
});

const User = mongoose.model('User',userSchema);

function validate(user){
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(5).max(1024).required(),
        password:Joi.string().min(6).max(1024).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validate;