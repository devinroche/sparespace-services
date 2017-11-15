const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listing = new Schema(
	{
		_host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		title: { type: String, required: true },
		price: { type: String, required: true },
		description: { type: String, required: true },
		location: "",
		images: [String]
	},{ collection: 'sparespacelisting' }
);

module.exports = mongoose.model('Listing', listing);
