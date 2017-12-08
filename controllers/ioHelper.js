

module.exports =  {
    testFunction: function(io) {
        io.on('connection', (client) => {
            client.on('join', () => { console.log('fart') });
        })
    }
}