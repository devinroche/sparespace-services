const mongoose = require('mongoose')
const Renter = mongoose.model('Renter')

module.exports = {
    allUsers(req, res){
        if(req.params.type == 'renter'){
            Renter.find({}, function (err, renter) {
                if (err)
                    res.json(err);

                res.send(renter)
            })
        }
    },
    createUser(req, res) {
        var newRenter = new Renter(req.body)
        newRenter.save(function (err, renter) {
            if(err)
                res.json(err)

            res.send(renter)
        })
    },
    getUser(req, res){
        Renter.findById(req.params.id, function(err, renter){
            if(err)
                res.json(err)

            res.send(renter)
        })
    },
    updateUser(req, res){
        Renter.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, renter){
            if (err) 
                res.json(err)

            res.send(renter)
        })
    },
    deleteUser(req, res){
        Renter.remove({_id: req.params.id}, function(err, renter){
            if(err)
                res.json(err)

            res.json({message: "User deleted"});
        })
    },
    loginUser(req, res){
        Renter.find(req.body, function (err, renter) {
            if (err)
                res.json(err);
            
            if(renter.length == 0){
                res.send(400)
            }
            else{
                res.send(200)
            }
        })
    }
}