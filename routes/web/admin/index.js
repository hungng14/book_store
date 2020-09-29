module.exports = (router) => {
    require('./signIn')(router);
    require('./dashboard')(router);
    require('./account')(router);
};
