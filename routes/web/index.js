module.exports = (router) => {
    require('./admin/index')(router);
    require('./member/index')(router);
};
