/**
 * Created by moonti on 2017. 11. 12..
 */
const Emoji = {
    monkey: { name: 'monkey', emoji: '🐵'}, dog: { name: 'dog', emoji: '🐶'},
    cat: { name: 'cat', emoji: '🐱'}, lion: { name: 'lion', emoji: '🦁'},
    tiger: { name: 'tiger', emoji: '🐯'}, unicorn: { name: 'unicorn', emoji: '🦄'},
    cow: { name: 'cow', emoji: '🐮'}, pig: { name: 'pig', emoji: '🐷'},
    boar: { name: 'boar', emoji: '🐗'}, mouse: { name: 'mouse', emoji: '🐭'},
};

var EmojiManager = {
    get: () => {
        var keys = Object.keys(Emoji);
        const index = Math.floor(Math.random() * keys.length ) + 0;
        return Emoji[keys[index]];
    }
}

module.exports = EmojiManager;