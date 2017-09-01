// var self = module.exports = {
//     addUsertoDB(user, db){
//         db.insert(user)
//     },
//     checkUsers(userObj, db, res){
//         db.findOne({ username: userObj.username }, function(err, user) {
//             if (user) {
//                 console.log("user already exists");
//             } else {
//                 var objUser = userData(userObj)
//                 self.addUsertoDB(objUser, db);
//             }
//         })
//     },
//     pruneHost(userObj){
//         var hostArr = []
//         for(var i=0; i<userObj.length; i++){
//             hostObj = {
//                 fullname: userObj[i].fullname,
//                 username: userObj[i].username,
//                 contact: userObj[i].contact,
//                 space: userObj[i].space
//             }
//             hostArr.push(hostObj)
//         }
//         return hostArr
//     }
// }

// userData = function(user){
//     var userObj = {
//         username: user.username,
//         fullname: user.fullname,
//         contact: {
//             email: user.contact.email,
//             phone: user.contact.phone,
//         },
//         isHost: false,
//         isStoring: false,
//         landlords: [],
//         renters: [],
//         space: {
//             size: user.space.size
//         }
//     }
//     console.log(userObj)
//     return userObj
// }

const mongoose = require('mongoose')
    User = mongoose.model('Users')
    

module.exports = {
    allUsers(req, res) {
        User.find({}, function (err, users) {
            if (err)
                res.send(err);

            res.send(users)
        })
    },
    createUser(req,res) {
        var newUser = new User(req.body)
        console.log(req)
        newUser.save(function (err, user) {
            console.log(user)
            if(err)
                res.send(err)

            res.send(user)
        })
    }
}