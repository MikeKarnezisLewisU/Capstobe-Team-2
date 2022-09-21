//Require JWT package to verify tokens
const jwt = require('jsonwebtoken')

//Checks midware status
const requireAuth = (req, res, next) => {

    //Grab the token that may or may not exist
    const token = req.cookies.jwt

    //Check if jwt exists and is valid
    if (token) {
        //Try to verify the token if we have one with jwt package
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
            //Check if there is an error then the token would be invalid if there is
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                //Carry on with what user wanted to do
                next()
            }
        })
    } else {
        //Redirect them somewhere to login
        res.redirect('/login')
    }
}

//Export above function to use outside this file
module.exports = { requireAuth }