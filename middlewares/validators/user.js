const {
    validateObjectId, validateStatus, validateEmail, validateMobile,
    validateField, validateFieldWithMinLength, validateRole,
} = require('./_utils');

const user_o_id = validateObjectId('user_o_id', true);
const status = validateStatus(true);
const email = validateEmail(true);
const fullname = validateFieldWithMinLength('fullname', 5, true);
const password = validateFieldWithMinLength('password', 5, true);
const re_password = validateFieldWithMinLength('re_password', 5, true);
const role = validateRole(true);

const sign_in_validator = {
    ...validateEmail(true),
    ...validateField('password', true),
};

const sign_in_with_social_validator = {
    ...validateField('fullname', true),
    ...validateEmail(false),
    ...validateMobile(false),
};

const register_validator = {
    ...email, ...fullname, ...password, ...re_password,
};

const create_validator = {
    ...email, ...fullname, ...password, ...re_password, ...role,
};
const update_validator = {
    ...user_o_id, ...email, ...fullname, ...role,
};
const get_info_validator = { ...user_o_id };
const update_status_validator = { ...user_o_id, ...status };
const delete_validator = { ...user_o_id };
module.exports = {
    create_validator,
    update_validator,
    get_info_validator,
    update_status_validator,
    delete_validator,
    sign_in_validator,
    register_validator,
    sign_in_with_social_validator,
};
