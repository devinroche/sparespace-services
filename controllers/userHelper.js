const mongoose = require('mongoose');
const mailHelper = require('./mailHelper');
const userModel = require('../models/userModel')
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
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

		bcrypt.hash(newUser.password, 10, (err, hash) => {
			newUser.password=hash
			newUser.save((err, user) => {
				if (err) 
					res.json(err);
		  
				mailHelper.sendEmailVerify(req.body.contact.email);
				res.send(user);
			});

		})
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

			else{
				bcrypt.compare(req.body.password, user.password, function(e, r){
					if (e) 
						res.json(e);
		
					if (user.length === 0) 
						res.sendStatus(404);
						
					else 
						res.send(user);

				})
			}
	
		});
	},

	verifyUser(req, res) {
		User.findOneAndUpdate(
			{ 'contact.email': req.params.email },
			{ isVerified: true },
			(err, user) => {
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

	getCords(req, res) {
		googleMapsClient.createClient({
			key: process.env.GMAPS,
		});

		googleMapsClient.geocode(
			{
				address: req.body.address,
			},
			(err, response) => {
				if (!err) 
					res.send(response.json.results);
				else 
					res.send(404);
        
			});
	}
};
