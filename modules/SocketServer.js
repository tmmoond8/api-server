/**
 * Created by moonti on 2017. 11. 12..
 */
var UserManager = require('./UserManager');
let userManager = new UserManager();
module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('join', (response) => {
            socket.join(response.chattingRoom);
            socket.join(response.userId);
            console.log('join - ', response.chattingRoom, response.userId);
            io.sockets.emit('join', userManager.addUser(response.userId));
        });

        socket.on('message', (msg) => {
            io.sockets.emit('message', msg);
        console.dir(msg);
        });
    });
}

