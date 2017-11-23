/**
 * Created by moonti on 2017. 11. 14..
 */

const modelDao = require('./../model/modelDao');
let gameLib = 
modelDao.gameDataSchema.find(function(err, gameList) {
    if(err) return res.status(500).send({error: 'database failure'});
    gameLib = gameList;
});

let games = JSON.parse(JSON.stringify(gameLib));
let gameInUse = {};

let gameManager = {
    pop: (id) => {
        const keys = Object.keys(Emoji);
        if (keys.length < 1) return defaultEmoji;
        const index = Math.floor(Math.random() * keys.length ) + 0;
        const emoji = JSON.parse(JSON.stringify(Emoji[keys[index]]));
        EmojiInUse[id] = emoji;
        delete Emoji[keys[index]];
        return emoji;
    },
    push: (id) => {
        const emoji = EmojiInUse[id];
        Emoji[emoji.name] = emoji;
    },
};

module.exports = EmojiManager;