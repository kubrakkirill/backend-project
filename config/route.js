const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/auth')

route.get('/', userController.startPage);

route.get('/logOut', userController.logOut);
route.get('/homepage', userController.homePage);

route.post('/signUp', userController.signUp);
route.post('/log-in', userController.logIn)
route.post('/add-new', userController.addQuestion)
route.post('/addQuestion' , userController.addNew)

module.exports = route;