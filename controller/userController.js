const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require("../config/route");

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
            redirect('/homePage')
        }
    }
  }
}
const signUp = async (request, response) => {
    let existUser = await userModel.findOne({email: request.body.email})
    let newUser = new userModel(request.body);
    newUser.save()
        .then( async () => {
            if (existUser){
                response.render('index',{
                    error: 'Email is already in use!'
                })
            } else {
                if (!request.body.password){
                    response.render('index',{
                        error: 'Password is required'
                    })
                } else {
                    let hashedPassword = await bcrypt.hash(request.body.password, 12)
                }
            }

            response.render('homePage')
        })
        .catch(error => {
            console.log(error)
        })
}

module.exports = {
    account,
    logIn,
    signUp,
}