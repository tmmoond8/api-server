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

const SEVER_INFO = {
    id: 10001,
    name: 'server',
}

class Message {
    constructor(user, message, type) {
        this.user = SEVER_INFO;
        this.message = message || '';
        this.type = type | MESSAGE_TYPE.BROADCAST;
    }

    setMessageId() {
        this.messageId = Message.createMessageId();
    };

    static createMessageId() {
        const toDay = new Date().toISOString().slice(0,19)
            .replace(/-/g,"").replace(/t/gi, "").replace(/:/g, "");
        return toDay + Math.floor((1 + Math.random()) * 31);
    }
}

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
        msg.messageId = Message.createMessageId();
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
        const message = new Message(null, msg, type);
        message.setMessageId();
        io.sockets.emit('notify', message);
    }
};
