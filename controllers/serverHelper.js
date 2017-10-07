const mongoose = require('mongoose')
const User = mongoose.model('User')
var nodemailer = require('nodemailer');


/*
Description: function that sends out email to user
inputs: - userid - id to user schema
        - email - email address of account verification
Note: very picky, you may need to delete and recopy code because of error 553 account verification bullshit..
*/ 
function sendMail(userid,email) {
    
    // email you use must not need o2 authorization 
    //email needs to be configured with 'less secure apps'
    var transporter = nodemailer.createTransport({
      service: 'yahoo',
      auth: {
        user: 'evanarends@yahoo.com',
        pass: 'Seahawks21'
      }
    });

    var mailOptions = {
        from: 'evanarends@yahoo.com',
        to: email,
        subject: 'SpareSpace Account Verification',
        text: "Please go to link to verify your email: " + "http://localhost:3001/verify/" + userid
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('works');
        }
    });



    
}




module.exports = {
    allUsers(req, res){
        User.find({}, function (err, user) {
            if (err)
                res.json(err);

            res.send(user)
        })
    },
    createUser(req, res) {
        var ending = /zagmail.gonzaga.edu/.test(req.body.contact.email);

        if (!ending) {
            console.log(ending);
        } else {
                var newUser = new User(req.body)
                newUser.save(function (err, user) {
                if(err)
                    res.json(err)
                sendMail(user._id,req.body.contact.email);
                res.send(user);
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
        console.log(req.body)
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
    //finds user that clicked email veriifcation link
    //updates their account to be verified
    verify_user(req,res) {
        User.findOneAndUpdate({_id: req.params.id}, {isVerified: true}, function(err, user){
            if (err) 
                res.json(err)
            res.send("account verified");
        })
    }
}