const {request, response} = require("express");

const logIn = (request, response) => {
    response.render('index',{
        error: null,
    })
}

module.exports = {
    logIn
}