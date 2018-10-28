/**
 * Created by moonti on 2017. 11. 14..
 */
let Config = {};
let mongoDB = {
    host: 'localhost',
}

mongoDB.baseURL = 'mongodb://' + mongoDB.host + '/cube_code';
Config.mongoDB = mongoDB;
module.exports = Config;