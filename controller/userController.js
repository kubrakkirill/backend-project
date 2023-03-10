const {request, response} = require("express");
const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const logIn = (request, response) => {
    response.render('index')
}
const signUp = async (request, response) => {
    let existUser = await userModel.findOne({email: request.body.email})
    if (existUser){
        response.render('index', {
            error: 'This email is already in use!'
        })
    } else {
        if (!request.body.password){
            response.render('index', {
                error: 'Password is require!'
            })
        } else {
            var hashedPassword = await bcrypt.hashSync(request.body.password, 12)
        }
        let newUserObj = {
            ...request.body,
            password: hashedPassword
        }
        let newUser = new userModel(newUserObj)
        newUser.save()
            .then ( async () => {
                let newToken = await jwt.sign({newUser}, 'Token')
                response.cookie('jwt', newToken, {httpOnly: true})
                response.render('homePage')
            })
            .catch ( error => {
                throw error
            })
    }
}

const logOut = (request, response) => {
    response.clearCookie('jwt');
    response.redirect('/')
}

module.exports = {
    logIn,
    signUp,
    logOut
}