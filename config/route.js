const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/auth')

route.get('/', userController.startPage);
route.get('/logOut', userController.logOut);
route.get('/homepage', userController.account);

route.post('/signUp', userController.signUp);
route.post('/log-in', userController.logIn)

module.exports = route;