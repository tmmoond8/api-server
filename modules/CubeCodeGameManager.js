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
const emptyRow = "00000000000";
const emptyBoard = emptyRow.split('').map(()=> emptyRow);

class CubeCodeGameManager {
    getGame() {
        if (currentGame) return currentGame;;
        const index = Math.floor(Math.random() * gameLib.length ) + 0;
        currentGame = gameLib[0].data;
        const newGame = {
            boards: CubeCodeGameManager.createFourBoard(currentGame),
            collectAnswer: currentGame.collectAnswer
        };
        currentGame = newGame;
        return currentGame;
    }
    clearGame () {
        currentGame = null;
    }
    static createFourBoard(board) {
        let index = 0;
        let fourBoards = [JSON.parse(JSON.stringify(emptyBoard)), JSON.parse(JSON.stringify(emptyBoard)),
            JSON.parse(JSON.stringify(emptyBoard)), JSON.parse(JSON.stringify(emptyBoard))];
        let checkData = [];
        board.split('\n').forEach((rowStr, rowIdx) => {
            rowStr.split('').forEach((number, columnIdx) => {
                if (number === '1') {
                    checkData.push({rowIdx: rowIdx, columnIdx: columnIdx});
                }
            });
        });

        while(checkData.length > 0) {
            const randomIndex = Math.floor(Math.random()*4827318 % checkData.length);
            const checkItem = checkData[randomIndex];
            const rowStr = fourBoards[index % 4][checkItem.rowIdx];
            fourBoards[index % 4][checkItem.rowIdx] = rowStr.substring(0, checkItem.columnIdx)
                + (index % 4 + 2) + rowStr.substring(checkItem.columnIdx + 1, 11);
            checkData.splice(randomIndex, 1);
            index++;
        }
        return fourBoards
    }
}

module.exports = CubeCodeGameManager;