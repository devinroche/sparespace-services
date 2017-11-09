const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const user = new Schema(
	{
		fullname: { type: String, required: true },
		password: { type: String, required: true },
		contact: {
			email: { type: String, required: true, unique: true },
			phone: { type: String, required: true },
			address: String,
		},
		userType: { type: String, required: true, default: 'renter' },
		isRenting: { type: Boolean, default: false },
		isHosting: { type: Boolean, default: false },
		isVerified: { type: Boolean, default: false },
	},{ collection: 'sparespaceusers' }
);

//before save run this
user.pre('save', function(next) {
	const user = this;

	if (!user.isModified('password')) 
		return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if(err) 
			return next(err);

		bcrypt.hash(user.password, salt, (err, hash) => {
			if(err) 
				return next(err);

			user.password = hash;
			next();
		});
	});
});

//compare login string and encrypted password
user.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) 
			return cb(err);
			
		cb(null, isMatch);
	});
};

user.plugin(uniqueValidator);
module.exports = mongoose.model('User', user);
