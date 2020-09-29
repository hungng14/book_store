module.exports = (router) => {
    require('./signIn')(router);
    require('./dashboard')(router);
    require('./account')(router);
    require('./category')(router);
    require('./author')(router);
};
