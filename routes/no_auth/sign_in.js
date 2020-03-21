const sign_in_con = require('../../controllers/sign_in');
const {
    signInMiddleware,
    registerMiddleware,
    signInWithSocialMiddleware,
} = require('../../middlewares/user');

module.exports = (router) => {
    router.post('/sign_in', signInMiddleware, sign_in_con.signIn);
    router.post('/sign_in_with_social', signInWithSocialMiddleware, sign_in_con.signInWithSocial);
    router.post('/register', registerMiddleware, sign_in_con.register);
};
