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



const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});


const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}