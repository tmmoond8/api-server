/**
 * Created by tmmoon on 17. 11. 3.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test_mongo');

var db = mongoose.connection;
// db.on('error', console.log(error));
// db.once('open', function() {
//     console.log('Connected to mongo server');
// });

var Schema = mongoose.Schema;
var cubecodeGameDataSchema = new Schema({
    data: String,
    collectAnswer: String
});

var modelDao = {
    gameDataSchema : mongoose.model('cubecodeGameData', cubecodeGameDataSchema)
};
module.exports = modelDao;