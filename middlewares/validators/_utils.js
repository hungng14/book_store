const { isObjectId, isMobilePhone } = require('../../utils/shared');
const { ROLES = [] } = require('../../constants/constants');

class Utils {
    validateObjectId(field_name, required = false) {
        return {
            [field_name]: {
                [required ? 'notEmpty' : 'optional']: true,
                custom: {
                    options: (value) => isObjectId(value),
                    errorMessage: `${field_name} must is ObjectId`,
                },
                errorMessage: `${field_name} is required`,
            },
        };
    }

    validateStatus(required) {
        return {
            status: {
                [required ? 'notEmpty' : 'optional']: true,
                custom: {
                    options: (value) => [10, 20, 40].includes(+value),
                    errorMessage: `status must is value in [${[10, 20, 40]}]`,
                },
                errorMessage: 'status is required',
            },
        };
    }

    validateEmail(required) {
        return {
            email: {
                [required ? 'notEmpty' : 'optional']: true,
                isEmail: true,
                errorMessage: 'email is required',
            },
        };
    }

    validateMobile(required) {
        return {
            mobile: {
                [required ? 'notEmpty' : 'optional']: true,
                custom: {
                    options: (value) => isMobilePhone(value),
                    errorMessage: 'mobile incorrect',
                },
                errorMessage: 'mobile is required',
            },
        };
    }

    validateField(field_name, required) {
        return {
            [field_name]: {
                [required ? 'notEmpty' : 'optional']: true,
                errorMessage: `${field_name} is required`,
            },
        };
    }

    validateFieldWithMinLength(field_name, min_length, required) {
        return {
            [field_name]: {
                [required ? 'notEmpty' : 'optional']: true,
                isLength: {
                    options: { min: min_length },
                    errorMessage: `${field_name} should be at least ${min_length} chars long`,
                },
                errorMessage: `${field_name} required`,
            },
        };
    }

    validateRole(required) {
        return {
            role: {
                [required ? 'notEmpty' : 'optional']: true,
                isInt: true,
                custom: {
                    options: (value) => ROLES.includes(+value),
                    errorMessage: `role must be value in [${ROLES}]`,
                },
                errorMessage: 'role is required',
            },
        };
    }
}

module.exports = new Utils();
