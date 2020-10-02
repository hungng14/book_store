const {
    validateField, validateObjectId,
} = require('./_utils');

const savedValidator = {
    ...validateField('description', true),
    ...validateField('mobile', false),
    ...validateField('email', false),
    ...validateField('facebookLink', false),
};
const informationOIdValidator = validateObjectId('informationOId', true);

const validateLogo = (required = false) => ({
    logo: {
        [required ? 'notEmpty' : 'optional']: true,
        errorMessage: 'logo is required and must be an image',
    },
});

module.exports = {
    createValidator: {
        ...savedValidator,
        ...validateLogo(true),
    },
    informationOIdValidator,
    updateValidator: { ...savedValidator, ...informationOIdValidator, ...validateLogo(false) },
};
