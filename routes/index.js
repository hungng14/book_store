const express = require('express');

const router = express.Router();
require('./no_auth')(router);
// require('./mobile')(router);
// require('./guard/middleware')(router, 'verifyAdmin');
require('./web')(router);

module.exports = router;
