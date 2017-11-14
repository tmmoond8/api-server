var express = require('express');
var router = express.Router();
var modelDao = require('./../model/modelDao');

/* GET cube-code listing. */
router.get('/game/list', function(req, res, next) {
    modelDao.gameDataSchema.find(function(err, gameData) {
    if(err) return res.status(500).send({error: 'database failure'});
    res.json(gameData);
  });
});

/* REGISTER new cube-code game */
router.post('/game/add', function(req, res) {
  var gameDataModel = new modelDao.gameDataSchema();
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
