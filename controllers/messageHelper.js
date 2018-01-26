const mongoose = require('mongoose');
const userModel = require('../models/messageModel')
const Message = mongoose.model('Message');
const ioHelper = require('./ioHelper')
const _ = require('lodash')

module.exports = {
	allMessages(req, res) {
        console.log(req.params)
		Message.find({'host': req.params.id1 ,'renter': req.params.id2 }, (err, m) => {
			if (err) 
				return res.json(err);
            
			res.send(m);
		});
    },
    
    allMSG(req, res) {
		Message.find({}, (err, m) => {
			if (err) 
				return res.json(err);
            
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
    },
    
    getConversations(req, res) {
        var id  = req.params.id;
        Message.aggregate([
            {$match: {$or: [{"host": mongoose.Types.ObjectId(id)},{"renter": mongoose.Types.ObjectId(id)}]}},
            { "$group": {"_id": {"host": "$host", "renter": "$renter"}}}
        ], function (err, result) {
            if (err) {
                return res.json(err);
            }
            result.populate(result, {path: "_id.renter", select: 'first'}, function(err, r) {
                console.log(r)
                res.send(r)
            });
        });
    }
};