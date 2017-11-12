const mongoose = require('mongoose');
const listingModel = require('../models/listingModel')
const User = mongoose.model('User');
const Listing = mongoose.model('Listing');

module.exports = {
	newListing(req, res) {
		req.body._host = mongoose.Types.ObjectId(req.body._host);
		const newListing = new Listing(req.body);
		newListing.save((err, listing) => {
			if (err) 
				res.json(err);

			res.send(listing);
		});
	},
	allListings(req, res) {
		Listing.find({}, (err, listing) => {
			if (err) 
				res.json(err);
      

			res.send(listing);
		});
	},
	listingDetails(req, res) {
		Listing.findOne({'_id': req.params.id} , (err, listing) => {
				if (err)
					res.json(err);
		
				else {
					console.log(listing)
					res.send(listing);
				}
			});
	},
	clearAll(req, res){
		Listing.remove({}, (err, listing) => {
			if(err)
				res.json(err)

			res.send(listing)
		})
	},
	sendInterest(req, res){
		User.find({'_id': { $in: [mongoose.Types.ObjectId(req.body.renter), mongoose.Types.ObjectId(req.body.host)]}}, function(err, user){
			Listing.findById(req.body.listing, (err, listing) => {
				mailHelper.expressInterest(user[0], user[1], listing);
				res.send("sent");
			})
		});
	}
};
