const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema 

var userSchema = new Schema ({
    username: {type:String, required: true, unique: true}, 
    fullname: { type: String, required: true }, 
    contact: {
        email: { type: String, required: true },
        phone: { type: String, required: true }, 
    },
    isHost: { type: Boolean, default: false },
    isStoring: { type: Boolean, default: false },
    landlords: [],
    renters: [],
    space: {
        size: String
    }
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Users', userSchema)