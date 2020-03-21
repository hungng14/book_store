const {
    sign_in_validator,
    create_validator,
    update_validator,
    get_info_validator,
    update_status_validator,
    delete_validator,
    register_validator,
    sign_in_with_social_validator,
} = require('./validators/user');

const { responseError, isEmpty } = require('../utils/shared');

class UserMiddleware {
    signInMiddleware(req, res, next) {
        req.checkBody(sign_in_validator);
        const errors = req.validationErrors();
        if (errors) {
            return res.json(responseError(1001, errors));
        }
        return next();
    }

    signInWithSocialMiddleware(req, res, next) {
        req.checkBody(sign_in_with_social_validator);
        const errors = req.validationErrors();
        if (errors) {
            return res.json(responseError(1001, errors));
        }
        return next();
    }

    registerMiddleware(req, res, next) {
        req.checkBody(register_validator);
        const errors = req.validationErrors();
        if (errors) {
            return res.json(responseError(1001, errors));
        }
        return next();
    }

    createMiddleware(req, res, next) {
        try {
            if (!isEmpty(req.file)) {
                req.body.full_url_image = req.file.path;
            }
            req.checkBody(create_validator);
            const errors = req.validationErrors();
            if (errors) {
                return res.json(responseError(1001, errors));
            }
            return next();
        } catch (error) {
            return res.json(responseError(1001, error));
        }
    }

    getInfoMiddleware(req, res, next) {
        req.checkBody(get_info_validator);
        const errors = req.validationErrors();
        if (errors) {
            return res.json(responseError(1001, errors));
        }
        return next();
    }

    updateMiddleware(req, res, next) {
        try {
            if (!isEmpty(req.file)) {
                req.body.full_url_image = req.file.path;
            }
            req.checkBody(update_validator);
            const errors = req.validationErrors();
            if (errors) {
                return res.json(responseError(1001, errors));
            }
            return next();
        } catch (error) {
            return res.json(responseError(1001, error));
        }
    }

    updateStatusMiddleware(req, res, next) {
        req.checkBody(update_status_validator);
        const errors = req.validationErrors();
        if (errors) {
            return res.json(responseError(1001, errors));
        }
        return next();
    }

    deleteMiddleware(req, res, next) {
        req.checkBody(delete_validator);
        const errors = req.validationErrors();
        if (errors) {
            return res.json(responseError(1001, errors));
        }
        return next();
    }
}

const ins = new UserMiddleware();
module.exports = ins;
