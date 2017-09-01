const mongoose = require('mongoose')
const Schema = mongoose.Schema 

var userSchema = new Schema ({
    username: {type:String, required:true}, 
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

module.exports = mongoose.model('Users', userSchema)