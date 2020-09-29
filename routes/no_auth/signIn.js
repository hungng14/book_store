const signInCtl = require('../../controllers/signIn');
const {
    signInMiddleware,
    registerMiddleware,
    // signInWithSocialMiddleware,
} = require('../../middlewares/account');

module.exports = (router) => {
    router.post('/admin/sign-in', signInMiddleware, signInCtl.signInAdmin);
    router.post('/sign-in', signInMiddleware, signInCtl.signInMember);
    // router.post('/sign_in_with_social', signInWithSocialMiddleware, sign_in_con.signInWithSocial);
    router.post('/register', registerMiddleware, signInCtl.register);
};
