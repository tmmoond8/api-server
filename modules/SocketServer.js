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
            join(socket, response);
        });

        socket.on('message', (msg) => {
            message(socket, msg);
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
    });

    const join = (socket, response) => {
        socket.join(response.chattingRoom);
        socket.join(response.userId);
        console.log('---- [JOIN] ----- ', response.chattingRoom, response.userId);
        io.sockets.emit('join', userManager.addUser(response.userId));
        socket['cubecode'] = {id: response.userId};
        io.sockets.emit('cubecode-game-one', cubeCodeGameManager.getGame().boards);
        io.sockets.emit('userList', userManager.getUserList());
    };
    const message = (socket, msg) => {
        io.sockets.emit('message', msg);
        if (cubeCodeGameManager.getGame().collectAnswer === msg.message) {
            cubeCodeGameManager.clearGame();
            userManager.scoreUp(socket.cubecode.id);
            console.log(cubeCodeGameManager.getGame());
            io.sockets.emit('cubecode-game-one', cubeCodeGameManager.getGame().boards);
            io.sockets.emit('test', 'collectAnswer');
            io.sockets.emit('userList', userManager.getUserList());
        }
        console.dir(msg);
    };
};
