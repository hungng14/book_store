module.exports = (router) => {
    require('./admin/index')(router);
    require('./user/index')(router);
};
