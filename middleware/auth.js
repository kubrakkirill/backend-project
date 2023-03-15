const jwt = require('jsonwebtoken');

const loggedInAlready = (req, res ,next) =>{
    const token = req.header('cookie');
    if (token) {
        let userToken = token.split('jwt=')[1];
        jwt.verify(userToken, 'user token', async (err, result) => {
            if(err) {
                console.log(err)
            }
            res.locals.user = result.user ? result.user : result.newUser;
        })
        next()
    }else{
        res.redirect('/login')
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