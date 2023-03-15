const jwt = require('jsonwebtoken');

const loggedInAlready = (req, res ,next) =>{
    const token = req.header('cookie');
    console.log(token)
    if (token) {
        next()
    }else{
        res.redirect('/')
    }
}


const checkLogIn = (req, res ,next) =>{
    const token = req.header('cookie');

    if (token) {
        res.redirect('/')
    }else{
        next();
    }
}
module.exports = {
    loggedInAlready,
    checkLogIn,
}