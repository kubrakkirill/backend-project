const mongoose = require('mongoose');
const {isEmail} = require('validator');


const userSchema = mongoose.Schema({
    userName :{
        type : String,
        required: true, 
        unique : true,       
    },

    email :{
        type : String,
        required : [true, 'please enter an email'],
        unique : true,
        lowercase: true,
        validate: [isEmail, 'please enter valid email']
    },

    password :{
        type : String,
        required: [true, 'please enter an password'],
        minlength : [8, 'minimum is 8 characters'],        
    }
})

module.exports = mongoose.model('user', userSchema);