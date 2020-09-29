const signInCtl = require('../../../controllers/signIn');
const {
    signInMiddleware,
} = require('../../../middlewares/account');

module.exports = (router) => {
    router.get('/admin/sign-in', signInCtl.viewSignInAdmin);
    router.post('/admin/sign-in', signInMiddleware, signInCtl.signInAdmin);
};
