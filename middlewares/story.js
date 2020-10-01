const {
    createValidator,
    updateValidator,
    storyOIdValidator,
    createChapterValidator,
    updateChapterValidator,
    chapterOIdValidator,
} = require('./validators/story');

const { responseError } = require('../utils/shared');
const { checkBodyValidator, checkQueryValidator } = require('./validators/_utils');

class ValidatorMiddleware {
    createMiddleware(req, res, next) {
        const errorValidator = checkBodyValidator(req, createValidator);
        if (errorValidator) return res.json(responseError(1001, errorValidator));
        return next();
    }

    updateMiddleware(req, res, next) {
        const errorValidator = checkBodyValidator(req, updateValidator);
        if (errorValidator) return res.json(responseError(1001, errorValidator));
        return next();
    }

    checkOIdMiddleware(req, res, next) {
        const errorValidator = checkBodyValidator(req, storyOIdValidator);
        if (errorValidator) return res.json(responseError(1001, errorValidator));
        return next();
    }

    checkQueOIdMiddleware(req, res, next) {
        const errorValidator = checkQueryValidator(req, storyOIdValidator);
        if (errorValidator) return res.json(responseError(1001, errorValidator));
        return next();
    }

    createChapterMiddleware(req, res, next) {
        const errorValidator = checkBodyValidator(req, createChapterValidator);
        if (errorValidator) return res.json(responseError(1001, errorValidator));
        return next();
    }

    updateChapterMiddleware(req, res, next) {
        const errorValidator = checkBodyValidator(req, updateChapterValidator);
        if (errorValidator) return res.json(responseError(1001, errorValidator));
        return next();
    }

    checkChapteOIdMiddleware(req, res, next) {
        const errorValidator = checkBodyValidator(req, chapterOIdValidator);
        if (errorValidator) return res.json(responseError(1001, errorValidator));
        return next();
    }
}

const ins = new ValidatorMiddleware();
module.exports = ins;
