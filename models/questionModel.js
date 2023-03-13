const mongoose = require('mongoose');

const dateType = new Date().toLocaleString();
console.log(dateType);

const questionSchema = mongoose.Schema({

    question :{
        type: String,
        required : true,
    },

    answer:{
        type: String,
        required : true,
    },

    created_at: {
        type: Date,
        default: dateType,
    },

})

module.exports = mongoose.model('questions', questionSchema);