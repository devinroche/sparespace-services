const helpers = require('../controllers/serverHelper')

module.exports = function(app, db, bodyParser) {
    console.log('route.js')

    // db = db.collection('main')

    app.route('/allusers')
        .get(helpers.allusers)
        
    app.route('/user')
        // .get(helpers.getusers)
        .post(helpers.createUser)

    // app.get('/', (req, res) =>{
    //     db.find().toArray((error, result) => {
    //         if(error)
    //             console.log(error)
    //         res.send(result)
    //     });
    // });

    // app.get('/activePost', (req, res) => {
    //     db.find({
    //         isHost: true
    //     }).toArray((error, result) => {
    //         if (error)
    //             console.log(error)

    //         console.log(result)
    //         var foo = helpers.pruneHost(result)
    //         console.log(foo)
    //         res.send(foo)
    //     });
    // })

    // app.post('/addUser', (req, res) => {
    //     var userObj = req.body
    //     helpers.checkUsers(userObj, db)
    //     res.send()
    // })
}

/* DB model

{
    username: "janedoe123",
    fullname: "Jane Doe",
    contact: {
        email: "janedoe@email.com",
        phone: "123-456-7890",
    }
}

*/
