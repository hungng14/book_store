const { URI_CONNECT_MONGO } = require('../settings/config');

require('./connection_db_master')(URI_CONNECT_MONGO);
