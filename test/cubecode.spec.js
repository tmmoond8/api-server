import request from 'supertest';
import { expect } from 'chai';

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
    })
});