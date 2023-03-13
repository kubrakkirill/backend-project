const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/auth')

route.get('/', userController.account);

//log-in function

route.get('/', middleware.loggedInAlready, userController.logIn);
route.get('/logOut', userController.logOut);

route.post('/homepage', userController.signUp);

//log-in function
route.post('/log-in',middleware.checkLogIn, userController.logIn)

//add new file route functions
route.get('/addQuestion' , userController.addNew)

module.exports = route;