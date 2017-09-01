const mongoose = require('mongoose')
    User = mongoose.model('Users')

module.exports = {
    allUsers(req, res){
        User.find({}, function (err, users) {
            if (err)
                res.json(err);

            res.send(users)
        })
    },
    createUser(req, res) {
        var newUser = new User(req.body)
        newUser.save(function (err, user) {
            if(err)
                res.json(err)

            res.send(user)
        })
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

            res.send(user)
        })
    },
    deleteUser(req, res){
        User.remove({_id: req.params.id}, function(err, user){
            if(err)
                res.json(err)

            res.json({message: "User deleted"});
        })
    }
}