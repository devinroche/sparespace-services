const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

var user = new Schema ({
    fullname: { type: String, required: true }, 
    password: { type: String, required: true }, 
    contact: {
        email: { type: String, required: true, unique: true},
        phone: {type:String, required: true }, 
        address: String
    },
    userType: {type: String, required:true, default: "renter" },
    isRenting: { type: Boolean, default: false },
    isHosting: { type: Boolean, default: false },
    isVerified: {type: Boolean,default: false},
}, { collection: "sparespaceusers" });

user.plugin(uniqueValidator);
module.exports = mongoose.model('User', user);
