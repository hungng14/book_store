const user_con = require('../../controllers/user');
const {
    createMiddleware,
    updateMiddleware,
    getInfoMiddleware,
    updateStatusMiddleware,
    deleteMiddleware,
} = require('../../middlewares/user');
const {
    fileFilterImage, storage, handleUpload, uploadFile,
} = require('../../utils/shared');

const uploadFileUser = uploadFile(storage('users'), fileFilterImage, 'image');

module.exports = (router) => {
    router.post('/api/wb/user/list_all', user_con.listAll);
    router.post('/api/wb/user/list', user_con.list);
    router.post('/api/wb/user/create', handleUpload(uploadFileUser), createMiddleware, user_con.create);
    router.post('/api/wb/user/get_info', getInfoMiddleware, user_con.getInfo);
    router.post('/api/wb/user/update', handleUpload(uploadFileUser), updateMiddleware, user_con.update);
    router.post('/api/wb/user/update_status', updateStatusMiddleware, user_con.updateStatus);
    router.post('/api/wb/user/delete', deleteMiddleware, user_con.delete);
    router.post('/api/wb/user/remove', deleteMiddleware, user_con.remove);
};
