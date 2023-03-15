
const userModel = require("../models/userModel");
const questionModel = require('../models/questionModel')
const commentModel = require('../models/commentModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// const homePage = (request, response) => {
//     questionModel.find()
//         .then(result => {
//             response.render('homePage', {
//                 error: null,
//                 question: result,
//             })
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }
const homePage = (request, response) => {
    questionModel.find()
        .populate('user')
        .then(question=>{
            response.render('homePage', {
                error: null,
                question: question,
            })
        })
        .catch(error => {
            console.log(error)
        })
    // userModel.findById(request.params.id)
    //     .then(result => {
    //         questionModel.find()
    //             .then(question=>{
    //                 response.render('homePage', {
    //                     error: null,
    //                     user: result,
    //                     question: question,
    //                 })
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
}


const startPage = (request, response) => {
    response.render('index',{
        error: null,
    })
}

const loginPage = (req, res)=> {
    res.render('index',{
        error: ''
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
                res.cookie('jwt', newToken, { httpOnly: true })
                res.redirect(`/`)
                // res.redirect(`/homepage/${user._id}`)
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
            let user = new userModel(newUserObj)
            user.save()
                .then ( async () => {
                    let newToken = await jwt.sign({user}, 'user token')
                    response.cookie('jwt', newToken, { httpOnly: true })
                    response.redirect(`/`)
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
    res.render('addQuestion', {
        user : req.params.id
    })
};

const addQuestion = (request, response) => {
    let newQuestion = new questionModel(request.body);
            newQuestion.save()
                .then(() => {
                    // homePage(request, response)
                    response.redirect('/')
                })
                .catch(error => {
                    console.log(error)
                })
    // userModel.findById(request.params.id)
    //     .then(result=>{
    //         let questionObj ={
    //             ...request.body,
    //             user: request.params.id
    //         }
    //         let newQuestion = new questionModel(questionObj);
    //         newQuestion.save()
    //             .then(() => {
    //                 console.log(request)
    //                 homePage(request, response)
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
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
    .then(()=> {
        res.redirect('/')
    })
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

//add comment function 
// const getComment = (request, response) =>{
//     commentModel.find()
//     .then(comments =>{
//         response.render('comment',{
//             comment: comments,
//             error: null,
//         })
//     })
//     .catch(err => console.log(err))
// }

const addComment = (req, res) => {
    let newComment = new commentModel(req.body);
    newComment.save()
        .then(() => {
            res.redirect('/comment')
        })
        .catch(error => {
            console.log(error)
        })
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
    // getComment,   
    addComment,
    loginPage
}