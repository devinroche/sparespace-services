const mongoose = require('mongoose');
const mailHelper = require('./mailHelper');
const userModel = require('../models/userModel')
const listingModel = require('../models/listingModel')
const Listing = mongoose.model('Listing')
const User = mongoose.model('User');
const googleMapsClient = require('@google/maps');

module.exports = {
	allUsers(req, res) {
		User.find({}, (err, user) => {
			if (err) 
				res.json(err);
      

			res.send(user);
		});
	},
	createUser(req, res) {
		const newUser = new User(req.body);
		
		newUser.save((err, user) => {
			if (err) 
				res.json(err);

			mailHelper.verifyEmail(newUser);
			res.send(user);
		});

	},

	getUser(req, res) {
		User.findById(req.params.id, (err, user) => {
			if (err) 
				res.json(err);
      
			res.send(user);
		});
	},

	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true },
			(err, user) => {
				if (err) 
					res.json(err);
        

				res.json({ message: 'user updated', user });
			});
	},
	deleteUser(req, res) {
		User.remove({ _id: req.params.id }, (err, user) => {
			if (err) 
				res.json(err);
      

			res.json({ user });
		});
	},
	loginUser(req, res) {
		User.findOne({'contact.email': req.body.email}, (err, user) => {
			if (err) 
				res.json(err);

			if(user)
				user.comparePassword(req.body.password, (err, isMatch) => {
					if (err) 
						throw err;

					res.send({isMatch, id: user._id, v: user.isVerified})
				});
			
			else
				res.sendStatus(404);

		});
	},

	verifyUser(req, res) {
		User.findOneAndUpdate(req.params._id, { isVerified: true }, {new: true}, (err, user) => {
			if (err) 
				res.json(err);
        

			res.json({message: 'account verified', user});
		});
	},
	clearAll(req, res){
		User.remove({}, (err, user) => {
			if(err)
				res.json(err)

			res.send(user)
		})
	},
	resendVerification(req, res){
		mailHelper.verifyEmail(req.body.id);
		res.send(200)
	},
	getAllCords(req, res) {
		//get all cords from all postings
		Listing.find({},'lat lng title', (err, listing) => {
			if (err) 
				res.json(err);
      

			res.send(listing);
		});
	},
	cords_to_address(req,res) {
		var googleMapsClient = require('@google/maps').createClient({
  			key: process.env.GMAPS
		});

		googleMapsClient.geocode({
		  address: req.body.address
		}, function(err, response) {
		  if (!err) {
		    res.send(response.json.results[0].geometry.location);
		  }
		});
	}
};
