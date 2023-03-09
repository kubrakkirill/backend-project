const {request, response} = require("express");

const logIn = (request, response) => {
    response.render('index')
}

module.exports = {
    logIn
}