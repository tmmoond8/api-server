/**
 * Created by tmmoon on 17. 11. 3.
 */
var mongoose = require('mongoose');
const Config = require('./../config');
mongoose.connect(Config.mongoDB.baseURL);

var db = mongoose.connection;

var Schema = mongoose.Schema;
var cubecodeGameDataSchema = new Schema({
    data: String,
    collectAnswer: String
});

var modelDao = {
    gameDataSchema : mongoose.model('cubecodeGameData', cubecodeGameDataSchema)
};
module.exports = modelDao;