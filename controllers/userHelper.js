const mongoose = require('mongoose');
const mailHelper = require('./mailHelper');
const userModel = require('../models/userModel')
const listingModel = require('../models/listingModel')
const User = mongoose.model('User');
const Listings = mongoose.model('Listing')
const bcrypt = require('bcrypt');

module.exports = {
	createUser(req, res) {
		const newUser = new User(req.body);
        
		newUser.save((err, user) => {
			if (err) 
				return res.json(err);

			mailHelper.verifyEmail(newUser);
			res.send(user);
		});

	},

	getUser(req, res) {
		User.findById(req.params.id, (err, user) => {
			if (err) 
				    return res.json(err);

			Listings.find({_host: user._id}, (err, listings) => {
				user.listings = listings
				res.send(user);
			})
		})
	},

	updateUser(req, res) {
		User.findById(req.params.id, (err, user) => {
			if('oldpass' in req.body)
				user.comparePassword(req.body.oldpass, (err, isMatch) => {
					if (err)
						return res.json(err);

					if (!isMatch)
						return res.sendStatus(401)

											
					bcrypt.hash(req.body.password, 10, (err, hash) => {
						if (err)
							return res.json(err);

						req.body.password = hash;
						User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, u) => {
							if (err)
								return res.json(err);

							return res.json({ message: 'user updated', u });
						});
					});
					
				});
			
			else 
				User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, u) => {
					if (err)
						return res.json(err);

					return res.json({ message: 'user updated', u });
				});
			
		})
	},
	
	resendV(req, res) {
		User.findById(req.body.u_id, (err, user) => {
			mailHelper.verifyEmail(user);
			res.json({status: 'sent'})
		})
	},

	loginUser(req, res) {
		User.findOne({'email': req.body.email}, (err, user) => {
			if (err) 
				return res.json(err);

			if(user)
				user.comparePassword(req.body.password, (err, isMatch) => {
					if (err) 
						return res.json(err);

					if (!isMatch)
						return res.sendStatus(401)

					return res.send({isMatch, id: user._id, v: user.isVerified})
				});
			
			else
				res.sendStatus(404);

		});
	},
    
	verifyUser(req, res) {
		User.findOneAndUpdate({_id: req.params.id}, {isVerified: true} , {new: true}, (err) => {
			if (err) 
				return res.json(err);

			res.cookie('fart', 'fart', { maxAge: 900000, httpOnly: false, overwrite: true})
			res.cookie('v', true, { maxAge: 900000, secure: false, httpOnly: false, false, overwrite: true});
			return res.redirect('https://inspiring-goldstine-bc424a.netlify.com/')
		});
	},

	resendVerification(req, res){
		User.findById(req.body.id, (err, user) => {
			if (err) 
				return res.json(err);
      
			mailHelper.verifyEmail(user);
			res.send(user);
		});
	},

	//use for testing only: remove all users from db
	clearAll(req, res){
		User.remove({}, (err, user) => {
			if(err)
				return res.json(err)

			res.send(user)
		})
	}
};
