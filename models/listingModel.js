const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema 
const User = mongoose.model('User')

var listing = new Schema ({
    _host: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    title: { type: String, required: true }, 
    duration: {type: String, required: true},
    description: {type: String, required: true}
}, { collection: 'sparespacelisting' })

module.exports = mongoose.model('Listing', listing)
