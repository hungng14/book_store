const { isObjectId, isMobilePhone, isEmpty } = require('../../utils/shared');
const { ROLES = [] } = require('../../constants/constants');

class Utils {
    validateObjectId(fieldName, required = false) {
        return {
            [fieldName]: {
                [required ? 'notEmpty' : 'optional']: true,
                custom: {
                    options: (value) => isObjectId(value),
                    errorMessage: `${fieldName} must is ObjectId`,
                },
                errorMessage: `${fieldName} is required`,
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

    validateField(fieldName, required, custom) {
        const objValidate = {
            [fieldName]: {
                [required ? 'notEmpty' : 'optional']: true,
                errorMessage: `${fieldName} is required`,
            },
        };
        if (!isEmpty(custom)) {
            objValidate[fieldName].custom = custom;
        }
        return objValidate;
    }

    validateFieldWithMinLength(fieldName, minLength, required, custom) {
        const objValidate = {
            [fieldName]: {
                [required ? 'notEmpty' : 'optional']: true,
                isLength: {
                    options: { min: minLength },
                    errorMessage: `${fieldName} should be at least ${minLength} chars long`,
                },
                errorMessage: `${fieldName} required`,
            },
        };
        if (!isEmpty(custom)) {
            objValidate[fieldName].custom = custom;
        }
        return objValidate;
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

    checkBodyValidator(req, validator) {
        req.checkBody(validator);
        const errors = req.validationErrors();
        return errors;
    }

    checkQueryValidator(req, validator) {
        req.checkQuery(validator);
        const errors = req.validationErrors();
        return errors;
    }
}

module.exports = new Utils();
