const mongoose = require('mongoose');
const schema = mongoose.Schema;
require('dotenv').config();
mongoose.connect(process.env.Mongo_Url);

const UserSchema = new schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100 
    },
    phoneno: {
        type: String,
        required: true,
        length: 10
    }
});

const updateUserSchema = new schema({
    firstname: {
        type: String,
        minlength: 3,
        maxlength: 20
    },
    lastname: {
        type: String,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 100
    }
});


const User = mongoose.model('User', UserSchema);
const Updateuser = mongoose.model('Updateuser', updateUserSchema);

module.exports = {
    User,
    Updateuser
}