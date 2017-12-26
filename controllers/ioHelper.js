module.exports = function(io) {
    io.on('connection', (client) => {
        client.on('join', () => { 
            console.log('fart') 
        });

        client.on('new space', (space) => {
            io.emit('refresh listings', { for: 'everyone' }, space);            
        });

        client.on('peer-msg', function(data) {
            console.log('Message from peer: %s', data);
            client.broadcast.emit('peer-msg', data);
        })
    })
}