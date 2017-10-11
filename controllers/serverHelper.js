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

    /*
    to test get request
    http://localhost:3000/verify/<user schema id>
    {
        "email": "john@gmail.com"
    }
    */
    sendEmailVerify(req,res) {  

        var smtpTransport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: "sparespace420",
                pass: "sparespace1"
            }
        });

        var mailOptions={
            to : req.body.email,
            subject : 'no-reply',
            text : 'Please go to this link to verify your sparespace account: http://localhost:3001/verify/'+req.params.id
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
    },

    //returns cordinates after address/zipcode/.. is posted
    getCords(req,res) { // begin
        var googleMapsClient = require('@google/maps').createClient({
            key: 'AIzaSyDsbtgLSTu3oT1esJkWRbAxmqGOBGsZEsE'
        });

        // Geocode an address.
        googleMapsClient.geocode({
            address: req.body.address
        }, function(err, response) {
            if (!err) {
                res.send(response.json.results);
            } else {
                res.send('nada');
            }
        });

    } //end

}