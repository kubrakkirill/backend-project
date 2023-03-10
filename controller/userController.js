const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require("../config/route");
const { render } = require("ejs");

const account = (request, response) => {
    response.render('index',{
        error: null,
    })
}

const logIn = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.render('index',{
            error: 'email and password are required'
        })
    }else{
        let user = await userModel.findOne({email : req.body.email});
        if (!user) {
            res.render('index',{
                error: 'user is not exist, please sign up first!'
            })
        }else{
            let correctPass = await bcrypt.compareSync(req.body.password, user.password)
            if (!correctPass) {
                res.render('index',{
                    error: 'password is not correct'
            })
        }else{
            let newToken = await jwt.sign({user}, 'user token')
            res.cookie('jwt', newToken)
            render('homePage')
        }
    }
  }
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
    account,
    logIn,
    signUp,
    logOut
}