// for evan
// I was thinking something like this. up to you

// var hostSchema = new Schema({
//     username: {type: String, required: true, unique:true},
//     fullname: { type: String, required: true }, 
//     contact: {
//         email: { type: String, required: true },
//         phone: { type: String, required: true }, 
//     },
//     isHosting: { type: Boolean, default: false },
//     renters: {
//         fullname: {type: String},
//         contact: {
//             email: { type: String},
//             phone: { type: String}, 
//         },
//         location: {type: String},
//         price: {type: String},
//         startDate: {type: Date},
//         endDate: {type: Date}
//     

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema 

var hostSchema = new hostSchema({
    //fill in crap here
}, { collection: 'hostinfo' })