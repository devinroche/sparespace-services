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
    }
}

userData = function(user){
    var userObj = {
        username: user.username,
        fullname: user.fullname,
        contact: {
            email: user.email,
            phone: user.phone,
        },
        isHost: false,
        isStoring: false,
        landlords: [],
        renters: []
    }
    console.log(userObj)
    return userObj
}