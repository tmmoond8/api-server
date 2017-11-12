/**
 * Created by moonti on 2017. 11. 12..
 */
const Emoji = require('./Emoji');
// userList는 id가 key이고 유저 객체가 value

let userList = {};
class User {
    constructor(id) {
        this.id = id;
        const newUser = Emoji.get();
        this.name = newUser.name;
        this.emoji = newUser.emoji;
    }
}

class UserManager {
    createUser(id) {
        return new User(id);
    }
    addUser(id) {
        userList[id] = this.createUser(id);
        return userList[id];
    }
}

module.exports = UserManager;