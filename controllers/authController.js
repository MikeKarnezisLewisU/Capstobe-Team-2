//Import the user model
const User = require('../models/User')

//Functions to handle the get and post requests from the 'routes' folder
module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    //console.log(req.body); //Shows the JSON req data in the console
    const { email, password } = req.body //Grabs the JSON objects one by one putting them into each variable

    //console.log(email, password); //Shows the same on console as first one above
    
    //Create a new user in the database with the user model
    try {
        //Create an instance of the user to save to DB
        //Must pass what matches the schema, so the email and password
        const user = await User.create({ email, password }) //Async, gives a promise; make sure the function is async then

        //Send response when above is done and it will be sent into our DB
        res.status(201).json(user) //Send back as json
    }
    catch(err) {
        console.log(err); //Log the error
        res.status(400).send('error, user not created') //Log the error type in the console
    }
    res.send('new signup');
}

module.exports.login_post = async (req, res) => {
    //console.log(req.body); //Shows the JSON req data in the console
    const { email, password } = req.body //Grabs the JSON objects one by one putting them into each variable

    console.log(email, password); //Shows the same on console as first one above
   
    res.send('user login');
}