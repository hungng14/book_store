const settingsDev = require('./development');
const settingsProd = require('./production');
if(process.env.ENV === 'production'){
    module.exports = {
        ...settingsProd,
        URI_CONNECT_MONGO: `mongodb://${settingsProd.DATABASE.USERNAME}:${settingsProd.DATABASE.PASSWORD}@${settingsProd.DATABASE.HOST}:${settingsProd.DATABASE.PORT}/${settingsProd.DATABASE.NAME}`,
    };
}
if(process.env.ENV === 'development'){
    module.exports = {
        ...settingsDev,
        URI_CONNECT_MONGO: `mongodb://${settingsDev.DATABASE.HOST}:${settingsDev.DATABASE.PORT}/${settingsDev.DATABASE.NAME}`,
    };
}