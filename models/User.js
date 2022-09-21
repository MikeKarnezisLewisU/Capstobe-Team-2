//User model that is going to be used for MongoDB in JSON format
//Use mongoose to do this
const mongoose = require('mongoose');

//Use the validator package to validate emails
const { isEmail } = require('validator') //Just need to pass this into validate now otherwise we'd have to use reqular expressions to check it

//Create a schema for what our objects will look in the database
const userSchema = new mongoose.Schema({
    
    //Require an email that will be a String and it must be unique from any other email on the site
    email: {
        type: String,
        required: [true, 'Please enter an email!'], //Use array format to make customized error messages
        unique: true,
        lowercase: true, //Turns everything into lowercase when stored in DB
        validate: [isEmail, 'Please enter a valid email!']
    },

    //Now make it to where we will need a required password with a minimum of 6 characters
    password: {
        type: String,
        required: [true, 'Please enter a password!'],
        minlength: [6, 'Minimum password length is 6 characters!']
    },
});

//Mongoose hooks pre/post (use the pre hook to hash a password before it's saved in DB)
//Fire a function after doc saved in DB MONGOOSE HOOKS
userSchema.post('save', function(doc, next) {
    //Sends that the user has been saved to the console after the save event has happened in the database
    console.log('New user has been saved!')
    next();
})

//Fire a function BEFORE doc saved to DB EXAMPLE IF TO BE USED LATER
/** 
userSchema.pre('save', function(next) {
    //this object refers to json to be saved into database
    console.log('user about to be created and saved', this)
    next();
})
*/

//Create a model based on this schema above
const User = mongoose.model('user', userSchema); //Must be singular of whatever we called our database for this, we called it 'users' (mongoose ploralizes it!)

//Export model to be used somewhere else like in the controllers to interact with the database
module.exports = User; //Allows us to require this somewhere else, so we can use it outside of this file