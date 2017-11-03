var express = require('express');
var mongoose = require('./../mongoose');
var router = express.Router();
var gameDataSchema = require('./../model/cubecodeGameData');

/* GET cube-code listing. */
router.get('/list', function(req, res, next) {

    gameDataSchema.find(function(err, books) {
    if(err) return res.status(500).send({error: 'database failure'});
    res.json(books);
  });
});

/* REGISTER new cube-code game */
router.post('/post', function(req, res) {
  var gameDataModel = new gameDataSchema();
  gameDataModel.data = req.body.data;
  gameDataModel.collectAnswer = req.body.collectAnswer;
  gameDataModel.save(function(err) {
    if(err) {
      console.log(err);
      res.json({result: 0});
      return;
    }
    res.json({result: 1});
  });
});

module.exports = router;
