const {request, response} = require("express");
const userModel = require('../models/userModel.js')
const bcrypt = require('bcrypt')


const logIn = (request, response) => {
    response.render('index')
}
const signUp = async (request, response) => {
    let existUser = await userModel.findOne({email: request.body.email})
    let newUser = new userModel(request.body);
    newUser.save()
        .then( () => {
            if (existUser){
                response.render('index',{
                    error: 'Email is already in use!'
                })
            } else {
                if (!request.body.password){
                    response.render('index',{
                        error: 'Password is required'
                    })
                }
            }

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