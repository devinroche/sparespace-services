module.exports = function(io) {
    io.on('connection', (client) => {
        client.on('new space', (space) => {
            io.emit('refresh listings', { for: 'everyone' }, space);            
        });

        client.on('peer-msg', function(data) {
            client.broadcast.emit('update msg');
        })
    })
}