const mongoose = require('mongoose');
const listingModel = require('../models/listingModel')
const mailHelper = require('./mailHelper')
const User = mongoose.model('User');
const Listing = mongoose.model('Listing');

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
		User.find({'_id': { $in: [mongoose.Types.ObjectId(req.body.renter), mongoose.Types.ObjectId(req.body.host)]}}, (err, user) => {
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
			(err) => {
				if(err)
					return res.json(err)

				res.send('added to interest')
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
		Listing.find({$or:[{$and:[{price:{$gt:req.body.cost_low}},{price:{$lt:req.body.cost_high}}]},{$and:[{duration:{$gt:req.body.dur_low}},{price:{$lt:req.body.dur_high}}]}]}).exec(function(err,docs) {

		
		//Listing.find().or(and([{price:{$gt:req.body.cost_low}},{price:{$lt:req.body.cost_high}}]).and({duration:{$gt:req.body.dur_low}},{price:{$lt:req.body.dur_high}}).exec(function(err, docs) {
			if (err)
				res.json(err)
			res.send(docs)
		});
	},
	

};
