const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listing = new Schema(
	{
		_host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		title: { type: String, required: true },
		price: { type: String, required: true },
		description: { type: String, required: true },
		location: {type: String, required: true},
		images: [String],
		interested: [String]
		lat: {type: String},
		lng: {type: String},
	},{ collection: 'sparespacelisting' }
);

module.exports = mongoose.model('Listing', listing);
