var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    displayName: {type: String}
});

module.exports=mongoose.model('contact', contactSchema);