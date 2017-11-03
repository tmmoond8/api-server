/**
 * Created by tmmoon on 17. 11. 3.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var cubecodeGameDataSchema = new Schema({
    data: String,
    collectAnswer: String
});

module.exports = mongoose.model('cubecodeGameData', cubecodeGameDataSchema);