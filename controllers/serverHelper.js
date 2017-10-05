const mongoose = require('mongoose')
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
        //check that email has .edu ending 
        
        var ending = /zagmail.gonzaga.edu/.test(req.body.contact.email);
        
        //Check that the name field is not empty
        //req.checkBody('fullname', 'full name required').notEmpty();

        //Trim and escape the name field. 
        //req.sanitize('fullname').escape();
        //req.sanitize('fullname').trim();

        //Run the validators
        //var errors = req.validationErrors();

        if (!ending) {
            // ask to rerender with apropriate erros sent
        } else {
            //data is all good
            var newUser = new User(req.body)
            newUser.save(function (err, user) {
            if(err)
                res.json(err)

            res.send(user)
            })
        }
        
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
    },
    loginUser(req, res){
        User.find(req.body, function (err, user) {
            if (err)
                res.json(err);
            
            if(user.length == 0){
                res.sendStatus(400)
            }
            else{
                res.sendStatus(200)
            }
        })
    }
}