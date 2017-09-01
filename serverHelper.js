var self = module.exports = {
    addUsertoDB(user, db){
        db.insert(user)
    },
    checkUsers(userObj, db, res){
        db.findOne({ username: userObj.username }, function(err, user) {
            if (user) {
                console.log("user already exists");
            } else {
                console.log("new user!");
                var objUser = userData(userObj)
                self.addUsertoDB(objUser, db);
            }
        })
    },
    pruneHost(userObj){
        hostObj = {
            fullname: userObj.fullname,
            username: userObj.username,
            contact: {
                email: userObj.contact.email,
                phone: userObj.contact.phone
            },
            space: userObj.space
        }
        return hostObj
    }
}

userData = function(user){
    var userObj = {
        username: user.username,
        fullname: user.fullname,
        contact: {
            email: user.contact.email,
            phone: user.contact.phone,
        },
        isHost: false,
        isStoring: false,
        landlords: [],
        renters: [],
        space: {
            size: user.space.size
        }
    }
    console.log(userObj)
    return userObj
}