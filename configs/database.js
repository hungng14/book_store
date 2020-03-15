const mongoose = require('mongoose');
const { URI_CONNECT_MONGO } = require('../settings/config');
const { logError, logInfo } = require('../libs/utils');

const uri = URI_CONNECT_MONGO;
function handleConnection(err) {
    if (err) {
        logError('Connection error!');
    } else {
        logInfo('Connection to database success');
    }
}
mongoose.connect(uri, { useNewUrlParser: true }, handleConnection);
