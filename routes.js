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
        console.log(req.body)
        var userObj = req.body
        // db.findOne({username: userObj.username}).then(
        //     (r) =>{
        //     res.send(r)
        //     }, 
        //     (err) => {
        //         res.send(err)
        //     })
        db.update({username: userObj.username},{
            username: userObj.username,
            fullname: userObj.fullname,
            email: userObj.email,
            address: userObj.address,
            isHost: false,
            isStoring: false,
            currStoring: []
        }, {
             upsert: true
           }, (err, result) => {
            console.log(result)
            if (err)
                console.log(err)

            else
                res.sendStatus(200)
        // })
        })
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
