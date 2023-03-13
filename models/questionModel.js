const mongoose = require('mongoose');

const dateType = new Date().toLocaleString();
console.log(dateType);

const questionSchema = mongoose.Schema({

    title :{
        type: String,
        required : true,
    },

    description:{
        type: String,
        required : true,
    },

    created_at: {
        type: Date,
        default: dateType,
    },

})

module.exports = mongoose.model('question', questionSchema);