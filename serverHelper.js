module.exports = {

    checkNewUser(userObject, db, res) {
        console.log(userObject)
        var newUser = true
        db.findOne({username: userObject.username}).then((r) =>{
                newUser = false
        }).then(() => {
            console.log(newUser)
            return newUser
        })
    }, 
    addUsertoDB(user, db){
        db.insert({
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            address: user.address,
            isHost: false,
            isStoring: false,
            currStoring: []
        })
        return "user added"
    },
    checkUsers(userObj, db, res){
        db.findOne({ username: userObj.username }, function(err, user) {
            if (user) {
                console.log("user already exists");
            } else {
                console.log("user doesnt exist");
                return module.exports.addUsertoDB(userObj, db);
            }
        })
    }
}