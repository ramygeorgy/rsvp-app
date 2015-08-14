var mongoose = require('mongoose');

var inviteSchema = new mongoose.Schema({
    inviteeid: {type: String},
    inviteetype: {type:String},
    staffid: {type: String},
    eventid: {type: String}
});

module.exports=mongoose.model('invite', inviteSchema);