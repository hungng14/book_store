module.exports = (router) => {
    require('./signIn')(router);
    require('./account')(router);
    require('./home')(router);
};
