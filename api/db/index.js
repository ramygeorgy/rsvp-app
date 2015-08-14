module.exports = function(config) {
    var mongoose = require('mongoose');
    var dbConnect = mongoose.connect('mongodb://' + config.dbServer + '/' + config.dbName);
    
    var db = {};
    
    
    db.connection = dbConnect;
    db.models = require('./models');
    
    return db;
};