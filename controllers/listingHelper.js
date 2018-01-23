const mongoose = require('mongoose');
const listingModel = require('../models/listingModel')
const mailHelper = require('./mailHelper')
const User = mongoose.model('User');
const Listing = mongoose.model('Listing');
const ioHelper = require('./ioHelper')

module.exports = {
	newListing(req, res) {
        req.body._host = mongoose.Types.ObjectId(req.body._host);
        const newListing = new Listing(req.body);
        newListing.save((err, listing) => {
            if (err) 
                return res.json(err);

            res.send(listing);
		});
    },
    
	allListings(req, res) {
        Listing.find({})
            .populate('_host', '_id first')
            .exec((err, listing) => {
                if (err) 
                    return res.json(err);

                res.send(listing);
		});
    },
    
	listingDetails(req, res) {
        Listing.findById(req.params.id)
                .populate('_host', '_id first')
                .exec((err, listing) => {
                    if (err) 
                        return res.json(err);

                    res.send(listing);
            });
    },
    
	sendInterest(req, res){
		User.find({'_id': { $in: [mongoose.Types.ObjectId(req.body.renter), mongoose.Types.ObjectId(req.body.host)]}}, function(err, user){
			Listing.findByIdAndUpdate(req.body.listing, {$push: { interested: req.body.renter} }, 
				{safe: true, upsert: true},
				(err, listing) => {
					if (err)
						return res.json(err);
                    
					mailHelper.expressInterest(user[0], user[1], listing);
			})
		});

		User.findByIdAndUpdate(req.body.renter, {$push: {interested: req.body.listing}}, 
			{safe: true, upsert: true},
			(err, user) => {
				if(err)
					return res.json(err)

				res.send("added to interest")
		})
    },

    getUsersInterest(req, res){
        Listing.find({ "_id": { "$in": req.params.arr }}, (err, listings) => {
            console.log(listings)
        })
    },
	// Use for testing only: clear all listings from db
	clearAll(req, res){
		Listing.remove({}, (err, listing) => {
			if(err)
				return res.json(err)

			res.send(listing)
		})
	},
};
