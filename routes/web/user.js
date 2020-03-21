const user_con = require('../../controllers/user');
const {
    createMiddleware: create_middleware,
    updateMiddleware: update_middleware,
    getInfoMiddleware: get_info_middleware,
    updateStatusMiddleware: update_status_middleware,
    deleteMiddleware: delete_middleware,
} = require('../../middlewares/user');
const {
    fileFilterImage, storage, handleUpload, uploadFile,
} = require('../../utils/shared');

const uploadFileUser = uploadFile(storage('users'), fileFilterImage, 'image');

module.exports = (router) => {
    router.post('/api/wb/user/list_all', user_con.list_all);
    router.post('/api/wb/user/list', user_con.list);
    router.post('/api/wb/user/create', handleUpload(uploadFileUser), create_middleware, user_con.create);
    router.post('/api/wb/user/get_info', get_info_middleware, user_con.get_info);
    router.post('/api/wb/user/update', handleUpload(uploadFileUser), update_middleware, user_con.update);
    router.post('/api/wb/user/update_status', update_status_middleware, user_con.update_status);
    router.post('/api/wb/user/delete', delete_middleware, user_con.delete);
    router.post('/api/wb/user/remove', delete_middleware, user_con.remove);
};
