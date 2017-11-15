/**
 * Created by moonti on 2017. 11. 12..
 */
var UserManager = require('./UserManager');
var CubeCodeGameManager = require('./CubeCodeGameManager');

let userManager = new UserManager();
let cubeCodeGameManager = new CubeCodeGameManager();
module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('join', (response) => {
            socket.join(response.chattingRoom);
            socket.join(response.userId);
            console.log('---- [JOIN] ----- ', response.chattingRoom, response.userId);
            io.sockets.emit('join', userManager.addUser(response.userId));
            socket['cubecode'] = {id: response.userId};
            io.sockets.emit('cubecode-game-one', cubeCodeGameManager.getGame().data);
            io.sockets.emit('userList', userManager.getUserList());
        });

        socket.on('message', (msg) => {
            io.sockets.emit('message', msg);
            if (cubeCodeGameManager.getGame().collectAnswer === msg.message) {
                cubeCodeGameManager.clearGame();
                io.sockets.emit('cubecode-game-one', cubeCodeGameManager.getGame().data);
                io.sockets.emit('test', 'collectAnswer');
            }
            console.dir(msg);
        });
        socket.on('test', (msg) => {
            console.log(msg);
        });
        socket.on('disconnect', () => {
            if (socket.cubecode) {
                console.log('---- [OUT] ----', userManager.removeUser(socket.cubecode.id));
                io.sockets.emit('userList', userManager.getUserList());
            }
        });
    })
};
