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
}