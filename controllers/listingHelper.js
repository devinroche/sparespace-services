const mongoose = require('mongoose');
const listingModel = require('../models/listingModel')
const mailHelper = require('./mailHelper')
const User = mongoose.model('User');
const Listing = mongoose.model('Listing');

module.exports = {
	newListing(req, res) {
        req.body._host = mongoose.Types.ObjectId(req.body._host);
        req.body.dates[0] = new Date(req.body.dates[0])
        req.body.dates[1] = new Date(req.body.dates[1]);

        const newListing = new Listing(req.body);

		newListing.save((err, listing) => {
			if (err) {
                console.log(err)
                return res.json(err);
            }
            
            console.log(listing)
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
    
    updateListing(req, res) {
		Listing.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (err, listing) => {
			if (err) 
				return res.json(err);
        

			res.json({ message: 'listing updated', listing });
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

    deleteListing(req, res) {
		Listing.remove({ _id: req.params.id }, (err, listing) => {
			if (err) 
				return res.json(err);
      

			res.json({listing});
		});
	},

	// Use for testing only: clear all listings from db
	clearAll(req, res){
		Listing.remove({}, (err, listing) => {
			if(err)
				return res.json(err)

			res.send(listing)
		})
	},
	most_recent(req,res) {
		Listing.find({}).sort('-timestamp').exec(function(err, docs) {
			if (err)
				res.json(err)
			res.send(docs)
		});
	},
	least_recent(req,res) {
		Listing.find({}).sort('timestamp').exec(function(err, docs) {
			if (err)
				res.json(err)
			res.send(docs)
		});
	},
	cost_low(req,res) {
		Listing.find({}).sort('price').exec(function(err, docs) {
			if (err)
				res.json(err)
			res.send(docs)
		});
	},
	cost_high(req,res) {
		Listing.find({}).sort('-price').exec(function(err, docs) {
			if (err)
				res.json(err)
			res.send(docs)
		});
	},
	range_point(req,res) {
		Listing.find({$or:[{price:{$lt:req.body.cost}},{duration:{$lt:req.body.duration}}]}).exec(function(err,docs) {
			if (err)
				return res.json(err)

			res.send(docs)
		});
		
	},
	

};
