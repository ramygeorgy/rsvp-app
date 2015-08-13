var express = require('express');

var rsvpAdminRouter = express.Router();

require('./auth.js')(rsvpAdminRouter);
require('./contacts.js')(rsvpAdminRouter);
require('./events.js')(rsvpAdminRouter);
require('./invites.js')(rsvpAdminRouter);
require('./staff.js')(rsvpAdminRouter);

module.exports = rsvpAdminRouter;
