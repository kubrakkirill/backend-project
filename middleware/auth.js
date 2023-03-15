const jwt = require('jsonwebtoken');

const loggedInAlready = (req, res ,next) =>{
    const token = req.header('cookie')
    let userToken = token.split('jwt=')[1]
    if (userToken) {
        jwt.verify(userToken, 'user token', async (err, result) => {
            if(err) {
                console.log(err)
            }
            if(result){
                res.locals.user = result.user ? result.user : result.newUser;
            } else {
                res.locals.user = false
            }

        })
        next()
    }else{
        res.redirect('/login')
    }
}


const checkLogIn = (req, res ,next) =>{
    const token = req.header('cookie')
    let userToken = token.split('jwt=')[1]
    if (userToken) {
        res.redirect('/')
    }else{
        next();
    }
}
module.exports = {
    loggedInAlready,
    checkLogIn,
}