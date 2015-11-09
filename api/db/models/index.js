module.exports = (function() {
    var models = {};
    
    models.Staff = require('./staff.js');
    models.Contact = require('./contact.js');
    models.Event = require('./event.js');
    
    return models;
})();

