module.exports = function(server, db, helpers, bodyParser) {
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
        var userObj = req.body
        helpers.checkUsers(userObj, db)
        res.send()
    })
}

/* DB model
TEST 
{
    "username": "pooppooperson",
    "fullname": "Poop Pooperson",
    "email": "poopyemail@email.com"
}

{
    username: string,
    fullname: string,
    email: string,
    isHost: bool,
    isStoring: bool,
    hosting:[
        {
            fullname: string
            username: string,
            email: string,
            paymentMethod: string,
            dateStart: string/date,
            dateEnd: string/date,
            stuff: []
        }
    ]
    storing: [
        {
            hostname: string,
            hostusername: string,
            address: string,
            email: string,
            paymentMethod: string,
            dateStart: string/date,
            dateEnd: string/date,
            stuff: []
        }
    ]
}

*/
