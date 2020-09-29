const { notSpaceAllow } = require('../../utils/shared');
const {
    // validateEmail,
    // validateMobile,
    validateField, validateFieldWithMinLength,
} = require('./_utils');

// const email = validateEmail(true);
const username = validateFieldWithMinLength('username', 5, true, {
    options: (val) => notSpaceAllow(val),
    errorMessage: 'username mustn\'t have space',
});
const firstname = validateField('firstname', true);
const lastname = validateField('lastname', true);
const password = validateFieldWithMinLength('password', 8, true);
const confirmPassword = validateFieldWithMinLength('confirmPassword', 5, true);

const signInValidator = {
    ...validateField('username', true),
    ...validateField('password', true),
};

// const sign_in_with_social_validator = {
//     ...validateField('fullname', true),
//     ...validateEmail(false),
//     ...validateMobile(false),
// };

const registerValidator = {
    ...username, ...firstname, lastname, ...password, ...confirmPassword,
};

module.exports = {
    signInValidator,
    registerValidator,
};
