const mongoose = require('mongoose');
const userModel = require('../models/messageModel')
const Message = mongoose.model('Message');
const ioHelper = require('./ioHelper')

module.exports = {
	allMessages(req, res) {
        console.log(req.query.renter)
		Message.find({
            'renter': req.query.renter
        }, (err, m) => {
			if (err) 
				return res.json(err);
      
            console.log(m)
			res.send(m);
		});
	},
	
	newMessage(req, res) {
        const newMessage = new Message(req.body);

		newMessage.save((err, m) => {
			if (err) 
				return res.json(err);

			res.send(m);
		});

	}
};
