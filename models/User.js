//User model that is going to be used for MongoDB in JSON format
//Use mongoose to do this
const mongoose = require('mongoose');

//Create a schema for what our objects will look in the database
const userSchema = new mongoose.Schema({
    
    //Require an email that will be a String and it must be unique from any other email on the site
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true //Turns everything into lowercase when stored in DB
    },

    //Now make it to where we will need a required password with a minimum of 6 characters
    password: {
        type: String,
        required: true,
        minLength: 6
    },
});

//Create a model based on this schema above
const User = mongoose.model('user', userSchema); //Must be singular of whatever we called our database for this, we called it 'users' (mongoose ploralizes it!)

//Export model to be used somewhere else like in the controllers to interact with the database
module.exports = User; //Allows us to require this somewhere else, so we can use it outside of this file