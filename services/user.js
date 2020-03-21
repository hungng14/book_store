const CrudService = require('./crud');
const config_jwt = require('../configs/jwt');
const { STATUS, ROLES } = require('../constants/constants');
const {
    responseError, responseSuccess, isEmpty, compareValue,
    sliceString, deleteFile, getFullPath,
} = require('../utils/shared');

class UserService extends CrudService {
    constructor() {
        super();
    }

    async sign_in(data) {
        try {
            const { email, password } = data;
            const conditions = {
                email,
                status: { $ne: STATUS.deleted },
            };
            const user = await this.user_collect.findOne(conditions);
            if (isEmpty(user)) {
                return responseError(1059);
            }
            if (!user.verify_password(password)) {
                return responseError(1060);
            }
            if (user.status === STATUS.new || user.status === STATUS.inactive) {
                return responseError(1061);
            }
            const payload = {
                user_o_id: user._id,
                email: user.email,
                role: user.role,
            };
            const payload_refresh_token = { ...payload };
            const token = await config_jwt.sign(payload, process.env.TOKEN_LIFE);
            const refresh_token = await config_jwt.sign(payload_refresh_token, process.env.REFRESH_TOKEN_LIFE || '7 days');
            const result = {
                token,
                refresh_token,
                ...payload,
            };
            return responseSuccess(108, result);
        } catch (error) {
            const { name } = error;
            if (name === 'JsonWebTokenError') {
                throw responseError(1002, error);
            }
            throw responseError(1000, error);
        }
    }

    async sign_in_with_social(data) {
        try {
            const {
                email = '', phone = '', avatar, fullname,
            } = data;
            const conditions = {
                email,
                status: { $ne: STATUS.deleted },
            };
            let user = await this.user_collect.findOne(conditions);
            if (isEmpty(user)) {
                const params_user = {
                    email,
                    phone,
                    avatar,
                    fullname,
                    status: STATUS.active,
                };
                const new_user = await this.create(params_user);
                if (isEmpty(new_user)) {
                    return responseError(1063);
                }
                user = new_user;
            }
            const payload = {
                user_o_id: user._id,
                email: user.email,
                role: user.role,
            };
            const payload_refresh_token = { ...payload };
            const token = await config_jwt.sign(payload, process.env.TOKEN_LIFE);
            const refresh_token = await config_jwt.sign(payload_refresh_token, process.env.REFRESH_TOKEN_LIFE || '7 days');
            const result = {
                token,
                refresh_token,
                ...payload,
            };
            return responseSuccess(108, result);
        } catch (error) {
            const { name } = error;
            if (name === 'JsonWebTokenError') {
                throw responseError(1002, error);
            }
            throw responseError(1000, error);
        }
    }

    async register(data) {
        try {
            const has_exist_email = await this.has_exist_email(data);
            if (has_exist_email) {
                return responseError(1052);
            }

            const set = {
                fullname: data.fullname,
                email: data.email,
                password: data.password,
                status: STATUS.active,
                role: ROLES.member,
            };
            const result = await super.create(set);
            if (!isEmpty(result)) {
                return responseSuccess(109);
            }
            return responseError(1062);
        } catch (error) {
            throw responseError(1062, error);
        }
    }

    async listAll() {
        try {
            const query = { is_removed: false };
            const populate = { path: 'contact_o_id', select: '-_id address phone' };
            const result = await super.listAll(query, populate);
            return responseSuccess(102, result);
        } catch (error) {
            throw responseError(1000, error);
        }
    }

    async list(data) {
        try {
            const query = { is_removed: false };
            const options = {
                limit: +data.limit || 10,
                page: +data.page || 1,
                sort: { [data.sort_key || '_id']: data.sort_order || -1 },
                select: 'info status created_date mobile email user_code',
            };
            const result = await super.listWithPagination(query, options);
            if (!isEmpty(result)) {
                return responseSuccess(102, result);
            }
            return responseError(1051);
        } catch (error) {
            throw responseError(1000, error);
        }
    }

    async has_exist_email(data) {
        try {
            const { email } = data;
            const conditions = {
                email,
            };
            const result = await this.user_collect.findOne(conditions);
            if (isEmpty(result)) {
                return false;
            }
            if (data.user_o_id) {
                return !compareValue(result._id, data.user_o_id);
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        function delete_url_img() {
            data.full_url_image && deleteFile(data.full_url_image);
        }
        try {
            const has_exist_email = await this.has_exist_email(data);
            if (has_exist_email) {
                delete_url_img();
                return responseError(1052);
            }

            const set = {
                fullname: data.fullname,
                email: data.email,
                password: data.password,
                status: STATUS.new,
                role: data.role,
            };
            if (!isEmpty(data.full_url_image)) {
                const replace_path = data.full_url_image.split('\\').join('/');
                const url_image = sliceString(replace_path, '/uploads');
                set.avatar = url_image;
            }
            const result = await super.create(set);
            if (!isEmpty(result)) {
                return responseSuccess(101, result);
            }
            delete_url_img();
            return responseError(1050);
        } catch (error) {
            delete_url_img();
            throw responseError(1000, error);
        }
    }

    async getInfo(data) {
        try {
            const conditions = {
                _id: data.user_o_id,
                status: { $ne: STATUS.deleted },
            };
            const fields = 'fullname email role avatar';
            const result = await super.getInfo(conditions, fields);
            if (!isEmpty(result)) {
                return responseSuccess(104, result);
            }
            return responseError(1055);
        } catch (error) {
            throw responseError(1000, error);
        }
    }

    async updateOne(data) {
        function delete_url_img() {
            data.full_url_image && deleteFile(data.full_url_image);
        }
        try {
            const has_exist_email = await this.has_exist_email(data);
            if (has_exist_email) {
                delete_url_img();
                return responseError(1052);
            }
            const conditions = {
                _id: data.user_o_id,
                status: { $ne: STATUS.deleted },
            };
            const set = {
                fullname: data.fullname,
                email: data.email,
            };
            if (data.status) {
                set.status = data.status;
            }
            if (data.role) {
                set.role = data.role;
            }
            const options = { new: true };
            if (!isEmpty(data.full_url_image)) {
                const replace_path = data.full_url_image.split('\\').join('/');
                const new_url_image = sliceString(replace_path, '/uploads');
                const setAvatar = {
                    avatar: new_url_image,
                };
                const result = await super.updateOne(conditions, setAvatar);
                if (isEmpty(result)) {
                    delete_url_img();
                    return responseError(1054);
                }
                const old_url_image = result.avatar;
                const full_path_old_url_image = getFullPath(`../public/${old_url_image}`);
                deleteFile(full_path_old_url_image);
            }
            const result = await super.updateOne(conditions, set, options);
            if (isEmpty(result)) {
                return responseError(1054);
            }
            return responseSuccess(103, result);
        } catch (error) {
            delete_url_img();
            throw responseError(1000, error);
        }
    }

    async update_status_one(data) {
        try {
            const conditions = {
                _id: data.user_o_id,
                status: { $ne: STATUS.deleted },
            };
            const set = {
                status: data.status,
            };
            const options = { new: true };
            const result = await super.updateOne(conditions, set, options);
            if (!isEmpty(result)) {
                return responseSuccess(106, result);
            }
            return responseError(1057);
        } catch (error) {
            throw responseError(1000, error);
        }
    }

    async delete_one(data) {
        try {
            const conditions = {
                _id: data.user_o_id,
                status: { $ne: STATUS.deleted },
            };
            const set = {
                status: STATUS.deleted,
            };
            const options = { new: true };
            const result = await super.updateOne(conditions, set, options);
            if (!isEmpty(result)) {
                return responseSuccess(105);
            }
            return responseError(1056);
        } catch (error) {
            throw responseError(1000, error);
        }
    }

    async removeOne(data) {
        try {
            const conditions = {
                _id: data.user_o_id,
            };
            const info_user = await super.getInfo(conditions);
            if (isEmpty(info_user)) {
                return responseError(1058);
            }
            const result = await super.removeOne(conditions);
            const { deletedCount = 0 } = result;
            if (deletedCount) {
                return responseSuccess(107);
            }
            return responseError(1058);
        } catch (error) {
            throw responseError(1000, error);
        }
    }
}

module.exports = new UserService();
