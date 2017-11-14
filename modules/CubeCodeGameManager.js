/**
 * Created by moonti on 2017. 11. 14..
 */

var modelDao = require('./../model/modelDao');
let gameLib;
modelDao.gameDataSchema.find(function(err, gameData) {
    if(err) return res.status(500).send({error: 'database failure'});
    gameLib = gameData;
});
let currentGame;

class CubeCodeGameManager {
    getGame() {
        if (currentGame) return currentGame;
        const index = Math.floor(Math.random() * gameLib.length ) + 0;
        currentGame = gameLib[index];
        return currentGame;
    }
    clearGame () {
        currentGame = null;
    }
}

module.exports = CubeCodeGameManager;