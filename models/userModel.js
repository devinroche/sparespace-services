const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema 

var user = new Schema ({
    username: {type:String, required: true, unique: true}, 
    fullname: { type: String, required: true }, 
    password: { type: String, required: true }, 
    contact: {
        email: { type: String, required: true },
        phone: {type:String, required: true }, 
        address: String
    },
    userType: {type: String, required:true, default: "renter" },
    isRenting: { type: Boolean, default: false },
    isHosting: { type: Boolean, default: false },
    isVerified: {type: Boolean,default: false},
    hosting: [
        {name: String, contact: {email: String, phone: String}, price: String, duration: String, startDate: Date}
    ],
    renting: [
        {name: String, contact: {email: String, phone: String}, price: String, address: String, duration: String, startDate: Date}
    ],
    post: [
        {title: String, duration: String, startDate: Date, description: String, price: String}
    ]
}, { collection: 'sparespaceusers' })

user.plugin(uniqueValidator)
module.exports = mongoose.model('User', user)
