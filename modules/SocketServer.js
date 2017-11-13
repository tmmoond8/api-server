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
            console.log('---- [JOIN] ----- ', response.chattingRoom, response.userId);
            io.sockets.emit('join', userManager.addUser(response.userId));
            socket['cubecode'] = {id: response.userId};
        });

        socket.on('message', (msg) => {
            io.sockets.emit('message', msg);
            console.dir(msg);
        });
        socket.on('test', (msg) => {
            console.log(msg);
        });
        socket.on('disconnect', () => {
            if (socket.cubecode) {
                console.log('---- [OUT] ----', userManager.removeUser(socket.cubecode.id));
            }
        });
    })
};
