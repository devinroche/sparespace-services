const mongoose = require('mongoose')
const mailHelper = require('./mailHelper')
const User = mongoose.model('User')


module.exports = {
    allUsers(req, res){
        User.find({}, function (err, user) {
            if (err)
                res.json(err);

            res.send(user)
        })
    },
    createUser(req, res) {
        console.log(req.body)
        var newUser = new User(req.body)
        newUser.save(function (err, user) {
            if(err)
                res.json(err)

            mailHelper.sendEmailVerify(req.body.contact.email)
            res.send(user);
        });
    },

    getUser(req, res){
        User.findById(req.params.id, function(err, user){
            if(err)
                res.json(err)

            res.send(user)
        })
    },

    updateUser(req, res){
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user){
            if (err)
                res.json(err)

            res.send(200)
        })
    },
    deleteUser(req, res){
        User.remove({_id: req.params.id}, function(err, user){
            if(err)
                res.json(err)

            res.sendStatus(200);
        })
    },
    loginUser(req, res){
        User.find({'contact.email': req.body.email, password: req.body.password}, function (err, user) {
            if (err)
                res.json(err);

            if(user.length == 0){
                res.sendStatus(404)
            }
            else{
                res.send(user)
            }
        })
    },

    verify_user(req,res) {
        User.findOneAndUpdate({'contact.email': req.params.email}, {isVerified: true}, function(err, user){
            if (err)
                res.json(err)
            res.send("account verified");
        })
    },

    getCords(req,res) { 
        var googleMapsClient = require('@google/maps').createClient({
            key: process.env.GMAPS
        });

        googleMapsClient.geocode({
            address: req.body.address
        }, function(err, response) {
            if (!err) {
                res.send(response.json.results);
            } else {
                res.send('nada');
            }
        });

    } 

}
