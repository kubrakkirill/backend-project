const mongoose = require('mongoose');
const moment = require("moment");

const commentSchema = mongoose.Schema({

    txt: {
        type : String,
        required : true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        get: function (createdAt) {
            return moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        }
    },

}, {timestamps: true})

module.exports = mongoose.model('comment', commentSchema);