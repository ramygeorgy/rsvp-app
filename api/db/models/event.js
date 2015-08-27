var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    name: {type: String},
    dateTime: {type: Date},
    location: {type: String},
    description: {type: String}
});

module.exports=mongoose.model('event', eventSchema);