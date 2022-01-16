const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        uppercase: true,
        index: true,
    },
    lastname: {
        type: String,
        required: true,
        uppercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    group: {
        type: String,
        required: true
     },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },    
    rol: {
        type: String,
        required: true
    }
});

module.exports.User = mongoose.model('User', userSchema);





