module.exports = (router) => {
    require('./signIn')(router);
    require('./session')(router);
};
