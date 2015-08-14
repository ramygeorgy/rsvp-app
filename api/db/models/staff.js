var mongoose = require('mongoose');

var staffSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    displayName: {type: String},
    password: {type: String}
});

module.exports=mongoose.model('staff', staffSchema);