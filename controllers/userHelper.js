const mongoose = require("mongoose");
const mailHelper = require("./mailHelper")
const User = mongoose.model("User")
const googleMapsClient = require("@google/maps");


module.exports = {
    allUsers(req, res){
        User.find({}, function (err, user) {
            if (err)
                res.json(err);

            res.send(user);
        })
    },
    createUser(req, res) {
        var newUser = new User(req.body)
        newUser.save(function (err, user) {
            if(err)
                res.json(err);

            mailHelper.sendEmailVerify(req.body.contact.email);
            res.send(user);
        });
    },

    getUser(req, res){
        User.findById(req.params.id, function(err, user){
            if(err)
                res.json(err);

            res.send(user);
        })
    },

    updateUser(req, res){
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user){
            if (err)
                res.json(err);

            res.json({ message: "user updated", user });
        })
    },
    deleteUser(req, res){
        User.remove({_id: req.params.id}, function(err, user){
            if(err)
                res.json(err);

            res.json({user});
        })
    },
    loginUser(req, res){
        User.find({"contact.email": req.body.email, password: req.body.password}, function (err, user) {
            if (err)
                res.json(err);

            if(user.length === 0){
                res.sendStatus(404);
            }
            else{
                res.send(user);
            }
        })
    },

    verifyUser(req,res) {
        User.findOneAndUpdate({"contact.email": req.params.email}, {isVerified: true}, function(err, user){
            if (err)
                res.json(err)
                
            res.send("account verified");
        })
    },

    getCords(req,res) { 
        googleMapsClient.createClient({
            key: process.env.GMAPS
        });

        googleMapsClient.geocode({
            address: req.body.address
        }, function(err, response) {
            if (!err) {
                res.send(response.json.results);
            } else {
                res.send(404);
            }
        });

    } 

}
