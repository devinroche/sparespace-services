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
            { "$group": {
                "_id": {"host": "$host", "renter": "$renter"}
            }},
        ], function (err, result) {
            if (err) {
                return res.json(err);
            }

            let foo = _.uniqBy(result, id);
            console.log(foo)
            res.send(result)
        });


        
        //     .find({
        //         $or: [
        //             { 'host': req.params.id },
        //             { 'renter': req.params.id }
        //         ]}, { host: 1, renter: 1 })
        //     .aggregate([{
        //         $group : {
        //             _id: {host: '$host', renter: '$renter'}
        //          }
        //     }])
        //     .populate('host', 'first last')
        //     .populate('renter', 'first last')
        //     .exec((err, m) => {
        //     if (err) 
        //         return res.json(err);
            
        //     res.send(m);
        // });
    }
};