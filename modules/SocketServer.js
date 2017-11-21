/**
 * Created by moonti on 2017. 11. 12..
 */
var UserManager = require('./UserManager');
var CubeCodeGameManager = require('./CubeCodeGameManager');

let userManager = new UserManager();
let cubeCodeGameManager = new CubeCodeGameManager();

const MESSAGE_TYPE = {
    BROADCAST : 0,
    NOTIFY : 32,
};

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
        const newUser = userManager.addUser(response.userId);
        io.sockets.emit('join', newUser);
        socket['cubecode'] = {id: response.userId};
        io.sockets.emit('cubecode-game-one', cubeCodeGameManager.getGame().boards);
        io.sockets.emit('userList', userManager.getUserList());
        notify(socket, newUser.name + '님이 입장 하였습니다', MESSAGE_TYPE.NOTIFY);
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

    const notify = (socket, msg, type) => {
        const message = {
            message: msg,
            type: type
        }
        io.sockets.emit('notify', message);
    }
};
