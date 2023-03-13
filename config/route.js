const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/auth')

route.get('/', userController.startPage);

//log-in function

route.get('/', userController.logIn);
route.get('/logOut', userController.logOut);
route.get('/homepage', userController.account);

route.post('/signUp', userController.signUp);
route.post('/log-in', userController.logIn)

//log-in function
route.post('/log-in', userController.logIn)

//add new file route functions

route.get('/addQuestion' , userController.addNew)

module.exports = route;