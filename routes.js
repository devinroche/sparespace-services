module.exports = function(server, db, helpers) {
    console.log('route.js')

    db = db.collection('main')

    server.get('/', (req, res) =>{
        db.find().toArray((error, result) => {
            if(error)
                console.log(error)
            res.send(result)
        });
    });

    server.get('/activePost', (req, res) => {
        db.find({
            isHost: true
        }).toArray((error, result) => {
            if (error)
                console.log(error)
            res.send(result)
        });
    })

    server.post('/addUser', (req, res) => {
        console.log(req, res)
        var userObj = req
        db.insertOne({
            // username: userObj.username,
            // fullname: userObj.fullname,
            // email: userObj.email,
            // address: userObj.address,
            // isHost: false,
            // currStoring: []
            username: 'fart',
            fullname: 'poop',
            email: 'emailpoop',
            address: 'poop address',
            isHost: false,
            currStoring: []
        }, (err, result) => {
            console.log(err, result)
        })
    })
}