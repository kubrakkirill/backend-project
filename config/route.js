const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/auth')

route.get('/', userController.account);

route.get('/', userController.logIn);
route.get('/logOut', userController.logOut);

//log-in function
route.post('/log-in', middleware.checkLogIn, userController.logIn)

route.post('/homepage', middleware.checkLogIn, userController.signUp);


module.exports = route;
