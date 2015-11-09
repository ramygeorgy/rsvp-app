var mongoose = require('mongoose');

var inviteSchema = new mongoose.Schema({
    inviteeid: {type: String},
    inviteetype: {type:String},
    staffid: {type: String}
});

var eventSchema = new mongoose.Schema({
    name: {type: String},
    dateTime: {type: Date},
    location: {type: String},
    description: {type: String},
    invites: [inviteSchema]
});

module.exports=mongoose.model('event', eventSchema);