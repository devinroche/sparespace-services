const mongoose = require('mongoose')
const User = mongoose.model('User')
var nodemailer = require('nodemailer');


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
                
                res.send(user);
                });
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
    },

    sendEmailVerify(req,res) {
        // var mailOptions = {
        //     from: '"Fred Foo ?" evanarendss@gmail.com', // sender address
        //     to: 'devinroche503@gmail.com', // list of receivers
        //     subject: 'Hello ✔', // Subject line
        //     text: 'Hello world ?', // plaintext body
            
        // }; 

        // transporter.sendMail(mailOptions, function(error, info){
        // if(error){
        //     return console.log(error);
        // }
        // console.log('Message sent: ' + info.response);
        // });   

        var smtpTransport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: "sparespace420",
                pass: "sparespace1"
            }
        });

        var mailOptions={
            to : 'roche.devin@ymail.com',
            subject : 'fart',
            text : 'fart'
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
            
         if(error){
            console.log(error);
            res.end("error");
            smtpTransport.close()
         }else{
            res.end("sent");
            smtpTransport.close()
            }
        });
    }
}