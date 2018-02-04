const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listing = new Schema({
	_host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	title: { type: String, required: true },
	price: { type: Number	, required: true },
	description: {type: String, required: true },
	duration: {type: Number, required:true},
	location: {type: String, required: true},
	images: [{type: String, required: true}],
	interested: [String],
	lat: {type: String},
	lng: {type: String},
	timestamp: {type:Number,required:true}
},{ collection: 'sparespacelisting' });

module.exports = mongoose.model('Listing', listing);
