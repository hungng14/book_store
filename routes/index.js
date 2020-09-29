const express = require('express');

const router = express.Router();

require('./no_auth')(router);
require('./guard/middleware')(router);
require('./web')(router);
require('./mobile')(router);

module.exports = router;
