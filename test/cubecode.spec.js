import request from 'supertest';
import { expect } from 'chai';
import CubeCodeGameManager from './../modules/CubeCodeGameManager';
import assert from 'assert';

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
                // console.log(gameItem);
            }
            done();
        })
    });

    it('POST /cubecode/game/add', (done) => {
        request(app).post('/cubecode/game/add')
        .send({data: '1010101010101010101010', collectAnswer: '수'})
        .expect(200).end((err, res) => {
            if(err) {
                done(err);
                return;
            }
            expect(res.body.result).to.equal(1);
            done();
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
});