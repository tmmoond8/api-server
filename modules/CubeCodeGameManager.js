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
        currentGame = gameLib[0].data;
        // console.log('collectAnswer : ' + currentGame.collectAnswer);
        let newGame = {
            boards: [currentGame, currentGame, currentGame, currentGame],
            collectAnswer: '밥'    
        };
        currentGame = newGame;
        return currentGame;
    }
    clearGame () {
        currentGame = null;
    }
    static createFourBoard(board) {
        
    }
}

module.exports = CubeCodeGameManager;