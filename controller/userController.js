const {request, response} = require("express");
const userModel = require("../models/userModel");

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
            redirect('/homePage')
        }
    }
  }
}

module.exports = {
    account,
    logIn,
}