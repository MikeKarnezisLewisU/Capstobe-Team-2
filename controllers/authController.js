//Import the user model
const User = require('../models/User')

//Require json web tokens for handeling the user when logged in
const jwt = require('jsonwebtoken')

//Function to handle errors
const handleErrors = (err) => {
    //The err.message will be the custom error messages we made in the User schema!
    console.log(err.message, err.code) //Provides the error type and its code if not unique

    //Create and errors object
    let errors = { email: '', password: '' }

    //Whenever there's an error there's the message "user validation failed"
    //So let's look for that phrase and if we have it we can mess around with it
    
    //Duplication errors (11000 is the error code for duplications)
    if (err.code === 11000) {
        errors.email = 'that email is already registered!'
        return errors;
    }

    //Validation errors
    if (err.message.includes('user validation failed')) {
        //console.log(err) //Object gives us error value of what the user tried to use, properties, path, kind of error inside the errors property
        //console.log(Object.values(err.errors)) //Get the values of the different things inside the errors object; given as an array
        //Lets get the individual errors
        Object.values(err.errors).forEach(({properties}) => {
            //console.log(properties)

            //The path should either be an email or password
            errors[properties.path] = properties.message //The properties.path will be either email or password so it will equal the value in our errors object and set them equal to the message for the corresponding error
        })
    }

    return errors; //Send the errors object back
} 

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
        //console.log(err); //Log the error
        //Use the handleErrors function to get correct error messages ready
        const errors = handleErrors(err)
        //res.status(400).send('error, user not created') //Log the error type in the console
        res.status(400).json( { errors }) //Will respond with the errors and the error message for each error in json format
    }
    res.send('new signup');
}

module.exports.login_post = async (req, res) => {
    //console.log(req.body); //Shows the JSON req data in the console
    const { email, password } = req.body //Grabs the JSON objects one by one putting them into each variable

    console.log(email, password); //Shows the same on console as first one above
   
    res.send('user login');
}