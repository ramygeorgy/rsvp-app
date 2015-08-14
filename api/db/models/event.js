var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    eventName: {type: String}
});

module.exports=mongoose.model('event', eventSchema);