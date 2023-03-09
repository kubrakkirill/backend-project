const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/auth')
route.get('/', userController.account);

//log-in function
route.post('/log-in', middleware.checkLogIn, userController.logIn)

route.post('/signUp', middleware.checkLogIn, userController.signUp);

module.exports = route;
