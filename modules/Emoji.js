/**
 * Created by moonti on 2017. 11. 12..
 */
const EmojiLibrary = {
    monkey: { name: 'monkey', emoji: '🐵'}, dog: { name: 'dog', emoji: '🐶'},
    cat: { name: 'cat', emoji: '🐱'}, lion: { name: 'lion', emoji: '🦁'},
    tiger: { name: 'tiger', emoji: '🐯'}, unicorn: { name: 'unicorn', emoji: '🦄'},
    cow: { name: 'cow', emoji: '🐮'}, pig: { name: 'pig', emoji: '🐷'},
    boar: { name: 'boar', emoji: '🐗'}, mouse: { name: 'mouse', emoji: '🐭'},
};
const defaultEmoji = {name: 'smile', emoji:'^^'};

let Emoji = JSON.parse(JSON.stringify(EmojiLibrary));
let EmojiInUse = {};

let EmojiManager = {
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