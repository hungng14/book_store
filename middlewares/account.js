const {
    signInValidator,
    registerValidator,
    // sign_in_with_social_validator,
} = require('./validators/account');

const { responseError } = require('../utils/shared');
const { checkBodyValidator } = require('./validators/_utils');

class UserMiddleware {
    signInMiddleware(req, res, next) {
        const errorValidator = checkBodyValidator(req, signInValidator);
        if (errorValidator) return res.json(responseError(1001, errorValidator));
        return next();
    }

    // signInWithSocialMiddleware(req, res, next) {
    //     req.checkBody(sign_in_with_social_validator);
    //     const errors = req.validationErrors();
    //     if (errors) {
    //         return res.json(responseError(1001, errors));
    //     }
    //     return next();
    // }

    registerMiddleware(req, res, next) {
        const errorValidator = checkBodyValidator(req, registerValidator);
        if (errorValidator) return res.json(responseError(1001, errorValidator));
        if (req.body.password !== req.body.confirmPassword) return res.json(responseError(1064));
        return next();
    }
}

const ins = new UserMiddleware();
module.exports = ins;
