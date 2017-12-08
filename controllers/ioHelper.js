

module.exports = function(io) {
    io.on('connection', (client) => {
        client.on('join', () => { 
            console.log('fart') 
        });

        client.on('new space', (space) => {
            console.log('turd ', space)
            io.emit('refresh listings', { for: 'everyone' }, space);            
        });
    })
}