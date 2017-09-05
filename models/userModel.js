const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema 

var renter = new Schema ({
    username: {type:String, required: true, unique: true}, 
    fullname: { type: String, required: true }, 
    contact: {
        email: { type: String, required: true },
        phone: { type: String, required: true }, 
    },
    isStoring: { type: Boolean, default: false },
    landlord: {
        fullname: {type: String},
        contact: {
            email: { type: String, required: true },
            phone: { type: String, required: true }, 
        },
        location: {type: String},
        price: {type: String},
        duration: {type: String}
    },
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Users', userSchema)