
const userModel = require("../models/userModel");
const questionModel = require('../models/questionModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const homePage = (request, response) => {
    questionModel.find()
        .then(result => {
            response.render('homePage', {
                error: null,
                question: result,
            })
        })
        .catch(error => {
            console.log(error)
        })
}

const startPage = (request, response) => {
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
            } else{
                let newToken = await jwt.sign({user}, 'user token')
                res.cookie('jwt', newToken)
                res.redirect('/homepage')

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
        if (!request.body.email || !request.body.password){
            response.render('index', {
                error: 'email and password are required'
            })
        } else {
            var hashedPassword = await bcrypt.hashSync(request.body.password, 12)
            let newUserObj = {
                ...request.body,
                password: hashedPassword
            }
            let newUser = new userModel(newUserObj)
            newUser.save()
                .then ( async () => {
                    let newToken = await jwt.sign({newUser}, 'Token')
                    response.cookie('jwt', newToken, {httpOnly: true})
                    response.redirect('/homepage')
                })
                .catch ( error => {
                    throw error
                })
        }
    }
}


const logOut = (request, response) => {
    response.clearCookie('jwt');
    response.redirect('/')
}

const addNew = (req,res) =>{
    questionModel.find()
    .then(result => {res.render('addQuestion', {users : result})})
    .catch(err => console.log(err))
    
};
const addQuestion = (request, response) => {
    let newQuestion = new questionModel(request.body);
    newQuestion.save()
        .then(() => {
            response.redirect('homepage')
        })
        .catch(error => {
            console.log(error)
        })
}


const commentPage = (req, res) => {
    questionModel.findById(req.params.id)
    .then(result => {
        res.render('comment' , {
            question: result,
        })
    })
    .catch(err => {console.log(err)})
}

//delete function
const deleteQuestion = (req, res) => {
    questionModel.findByIdAndDelete(req.params.id)
    .then(()=> {res.redirect('/homePage')})
    .catch(err =>{ console.log(err)});    
}
    
//edit functions
const editQuestion =(req, res) =>{
    questionModel.findById(req.params.id)
    .then(result => {
        res.render('edit' , {
            question: result,
        })
    })
    .catch(err => console.log(err))
}

const updateQuestion = (req, res) =>{
    questionModel.findByIdAndUpdate(req.params.id, req.body)
   .then(result => {
    res.render('comment', {
        question: result,
    })
   })
   .catch(err => console.log(err))
}


module.exports = {
    homePage,
    logIn,
    signUp,
    logOut,
    startPage,
    addNew,
    addQuestion,
    commentPage,
    deleteQuestion,
    editQuestion,
    updateQuestion,
}