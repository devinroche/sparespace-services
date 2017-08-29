module.exports = function(server, db, helpers) {
    console.log('route.js')

    server.get('/', (req, res) =>{
        console.log('loading collection for home page')
        db.collection('sparespace').find().toArray((error, result) => {
            console.log('looking in ss collection')
            console.log(error, result)
            if(error) {
                console.log(error)
            }
            
        });
    });
}