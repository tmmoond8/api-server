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

module.exports = mongoose;