const mongoose = require('mongoose');
const {URI_CONNECT_MONGO} = require('../settings/config');
let uri = URI_CONNECT_MONGO;
function handleConnection(err){
    if (err) {
        console.log(err)
        console.log('Connection error!');
    } else {
        console.log('Connection to database success');
    }
}
console.log(uri)
mongoose.connect(uri, {useNewUrlParser: true}, handleConnection);