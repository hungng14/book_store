const CrudService = require('./crud');
const configJWT = require('../configs/jwt');
const { STATUS, ROLES } = require('../constants/constants');
const {
    responseError, responseSuccess, isEmpty, compareValue,
    sliceString, deleteFile, getFullPath,
} = require('../utils/shared');

class AccountService extends CrudService {
    constructor() {
        super();
    }

    async signInMember(data) {
        data.roleType = ROLES.MEMBER;
        return this.signIn(data);
    }

    async signInAdmin(data) {
        data.roleType = ROLES.ADMIN;
        return this.signIn(data);
    }

    async signIn(data) {
        try {
            const conditions = {
                username: data.username,
                roleType: data.roleType,
                isDeleted: false,
            };
            const account = await this.accountCollection.findOne(conditions);
            if (isEmpty(account)) return responseError(1065);
            if (!account.verifyPassword(data.password)) return responseError(1065);
            if (account.status === STATUS.New || account.status === STATUS.Inactive) return responseError(1065);

            const payload = {
                accountOId: account._id,
                username: account.username,
            };
            const payloadRefreshToken = { ...payload };
            const propSignJWT = data.roleType === ROLES.ADMIN ? 'signAdmin' : 'signMember';
            const token = await configJWT[propSignJWT]({ ...payload, roleType: account.roleType }, process.env.TOKEN_LIFE);
            const refreshToken = await configJWT[propSignJWT](payloadRefreshToken, process.env.REFRESH_TOKEN_LIFE || '7 days');
            const result = {
                token,
                refreshToken,
                ...payload,
            };
            return responseSuccess(208, result);
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
            data.roleType = ROLES.MEMBER;
            const existUsername = await this.hasExistUsername(data);
            if (existUsername) return responseError(1052);
            const set = {
                username: data.username,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname,
                status: STATUS.Active,
                roleType: ROLES.MEMBER,
            };
            const result = await super.create(set);
            if (!isEmpty(result)) return responseSuccess(209);
            return responseError(1062);
        } catch (error) {
            throw responseError(1000, error);
        }
    }

    async list(data) {
        try {
            const query = { isDeleted: false };
            const options = {
                limit: +data.limit || 10,
                page: +data.page || 1,
                sort: { [data.sortKey || '_id']: data.sortOrder || -1 },
                select: 'created_date fullname mobile status mobile email',
            };
            const result = await super.listWithPagination(query, options);
            if (!isEmpty(result)) {
                return responseSuccess(202, result);
            }
            return responseError(1051);
        } catch (error) {
            throw responseError(1000, error);
        }
    }

    async hasExistUsername(data) {
        try {
            const conditions = {
                username: data.username,
                roleType: data.roleType,
                isDeleted: false,
            };
            const result = await this.accountCollection.findOne(conditions);
            if (isEmpty(result)) return false;
            if (data.accountOId) {
                return !compareValue(result._id, data.accountOId);
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    deleteUrlImage(fullUrlImage) {
        if (fullUrlImage) deleteFile(fullUrlImage);
    }

    async create(data) {
        try {
            const has_exist_email = await this.hasExistEmail(data);
            if (has_exist_email) {
                this.deleteUrlImage(data.fullUrlImage);
                return responseError(1052);
            }

            const set = {
                fullname: data.fullname,
                email: data.email,
                password: data.password,
                status: STATUS.new,
                role: data.role,
            };
            if (!isEmpty(data.fullUrlImage)) {
                const replace_path = data.fullUrlImage.split('\\').join('/');
                const url_image = sliceString(replace_path, '/uploads');
                set.avatar = url_image;
            }
            const result = await super.create(set);
            if (!isEmpty(result)) {
                return responseSuccess(101, result);
            }
            this.deleteUrlImage(data.fullUrlImage);
            return responseError(1050);
        } catch (error) {
            this.deleteUrlImage(data.fullUrlImage);
            throw responseError(1000, error);
        }
    }

    async updateOne(data) {
        try {
            const has_exist_email = await this.hasExistEmail(data);
            if (has_exist_email) {
                this.deleteUrlImage(data.fullUrlImage);
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
            if (!isEmpty(data.fullUrlImage)) {
                const replace_path = data.fullUrlImage.split('\\').join('/');
                const new_url_image = sliceString(replace_path, '/uploads');
                const setAvatar = {
                    avatar: new_url_image,
                };
                const result = await super.updateOne(conditions, setAvatar);
                if (isEmpty(result)) {
                    this.deleteUrlImage(data.fullUrlImage);
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
            this.deleteUrlImage(data.fullUrlImage);
            throw responseError(1000, error);
        }
    }

    async deleteOne(data) {
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
                return responseSuccess(205);
            }
            return responseError(1056);
        } catch (error) {
            throw responseError(1000, error);
        }
    }
}

module.exports = new AccountService();
