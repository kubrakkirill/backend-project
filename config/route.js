const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');

route.get('/', userController.logIn);

route.post('/signUp', userController.signUp);

module.exports = route;
