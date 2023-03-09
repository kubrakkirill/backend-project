const {request, response} = require("express");

const account = (request, response) => {
    response.render('index',{
        error: null,
    })
}

module.exports = {
    account,
}