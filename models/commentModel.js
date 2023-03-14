const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({

    txt: {
        type : String,
        required : true,
    },

})

module.exports ={
    commentSchema,
}