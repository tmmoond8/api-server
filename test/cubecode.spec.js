import request from 'supertest';
import { expect } from 'chai';
import CubeCodeGameManager from './../modules/CubeCodeGameManager';
import assert from 'assert';
var modelDao = require('./../model/modelDao');
import Emoji from './../modules/Emoji';

import app from './../app';

describe('CubeCode API', () => {
    it('GET /cubecode/game/list', (done) => {
        request(app).get('/cubecode/game/list').expect(200)
        .end((err, res) => {
            if(err) {
                done(err);
                return;
            }
            if (res.body.length > 0) {
                const randomIdx = Math.floor(Math.random()*res.body.length);
                const gameItem = res.body[randomIdx];
                expect(gameItem).has.all.keys(['__v', '_id', 'collectAnswer', 'data'])
            }
            done();
        })
    });

    it('POST /cubecode/game/add', (done) => {
        request(app).post('/cubecode/game/add')
        .send({data: '1010101010101010101010', collectAnswer: '괾'})
        .expect(200).end((err, res) => {
            if(err) {
                done(err);
                return;
            }
            expect(res.body.result).to.equal(1);
            modelDao.gameDataSchema.remove({collectAnswer: '괾'}, function(err) {
                if (err) console.log(err);
                done();
            });
        })
    });

    it('CubeCodeGameManager.createFourBoard', (done) => {
        const board = '00000000000\n00000100000\n00000100000\n00000100000\n00001010000\n00010001000\n01100000110\n00000100000\n00000100000\n00000100000\n11111111111';
        const fourBoard = CubeCodeGameManager.createFourBoard(board);
        let valueCount = 0;
        let aBoard, aRow;

        var rowTest = (row) => {
            aRow = row.split('');
            assert.equal(11, aRow.length);
            aRow.forEach((value) => {if(value !== '0') valueCount++});
        }

        for (let i = 0; i < 4; i++) {
            aBoard = fourBoard[i];
            assert.equal(11, aBoard.length);
            aBoard.forEach((row) => {rowTest(row)})
        }
        assert.equal(25, valueCount);

        done();
    });


    it('CubeCodeGameManager.getGame', (done) => {
        const gameData = new CubeCodeGameManager().getGame();
        let aBoard, aRow;

        var rowTest = (row) => {
            aRow = row.split('');
            assert.equal(11, aRow.length);
        }

        for (let i = 0; i < 4; i++) {
            aBoard = gameData.boards[i];
            assert.equal(11, aBoard.length);
            aBoard.forEach((row) => {rowTest(row)})
        }

        assert.equal(1, gameData.collectAnswer.length);
        done();
    });
    it ('Emoji.pop', (done) => {
        let emojiCount = Object.keys(Emoji.getEmojiInUse()).length;
        let user, i;
        const emojiMax = Emoji.getEmojiLibMax();
        for (i = 0; i < emojiMax; i++) {
            user = Emoji.pop(i+'1123');
            assert.equal(Emoji.getEmojiInUse()[i+'1123'], user);
        }
        assert.equal('smile', Emoji.pop('1123').name);
        assert.equal(Emoji.getEmojiInUse()[3+'1123'], Emoji.pop(3+'1123'));

        Emoji.push(3+'1123');
        assert.equal(undefined, Emoji.getEmojiInUse()[3+'1123']);
        done();
    });
});