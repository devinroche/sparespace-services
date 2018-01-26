const mongoose = require('mongoose');
const mailHelper = require('./mailHelper');
const userModel = require('../models/userModel')
const listingModel = require('../models/listingModel')
const User = mongoose.model('User');

module.exports = {
	allUsers(req, res) {
		User.find({}, (err, user) => {
			if (err) 
				return res.json(err);
      
			res.send(user);
		});
	},
	
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
		User.findById(req.params.id)
			.populate('interested')
			.exec((err, user) => {
				if (err) 
				    return res.json(err);

			    res.send(user);
			})
	},
    


	updateUser(req, res) {
		User.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (err, user) => {
			if (err) 
				return res.json(err);
        

			res.json({ message: 'user updated', user });
		});
	},
    
	deleteUser(req, res) {
		User.remove({ _id: req.params.id }, (err, user) => {
			if (err) 
				return res.json(err);
      

			res.json({user});
		});
	},
    
	loginUser(req, res) {
		User.findOne({'email': req.body.email}, (err, user) => {
			if (err) 
				return res.json(err);

			if(user)
				user.comparePassword(req.body.password, (err, isMatch) => {
					if (err) 
						return res.json(err);

					res.send({isMatch, id: user._id, v: user.isVerified})
				});
			
			else
				res.sendStatus(404);

		});
	},
    
	verifyUser(req, res) {
		User.findOneAndUpdate({_id: req.params.id}, {isVerified: true} , {new: true}, (err) => {
			if (err) 
				return res.json(err);

			res.cookie('v', true, { maxAge: 900000, httpOnly: false});
			res.redirect('http://localhost:3000/')
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
