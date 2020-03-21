const mongoose = require('mongoose');
const {
    logError, logSuccess,
} = require('../utils/shared');

async function handle_connect(err, db) {
    if (err) logError('Connecting to Database failed!');
    else {
        logSuccess(`Connecting to Database Master: "${db.name}" success!`);
    }
}
module.exports = async (uri) => {
    mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, handle_connect);
};
