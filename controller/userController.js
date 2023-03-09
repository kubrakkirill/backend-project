const {request, response} = require("express");
const userModel = require('../models/userModel.js')


const logIn = (request, response) => {
    response.render('index')
}
const signUp = (request, response) => {
    let newUser = new userModel(request.body);
    newUser.save()
        .then(() => {
            console.log(newUser)
            response.render('homePage')
        })
        .catch(error => {
            console.log(error)
        })
}

module.exports = {
    logIn,
    signUp
}