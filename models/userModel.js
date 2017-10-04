const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema 

var user = new Schema ({
    username: {type:String, required: true, unique: true}, 
    fullname: { type: String, required: true }, 
    password: { type: String, required: true }, 
    contact: {
        email: { type: String, required: true },
        phone: { type: String, required: true }, 
    },
    isStoring: { type: Boolean, default: false },
    landlord: {
        fullname: {type: String},
        contact: {
            email: { type: String},
            phone: { type: String}, 
        },
        location: {type: String},
        price: {type: String},
        duration: {type: String}
    }
}, { collection: 'sparespaceusers' })

user.plugin(uniqueValidator)
module.exports = mongoose.model('User', user)


/* post test dummy user
{
    username: "janedoe123",
    fullname: "Jane Doe",
    contact: {
        email: "janedoe@email.com",
        phone: "123-456-7890",
    }
}
*/