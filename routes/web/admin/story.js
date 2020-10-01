const storyCtl = require('../../../controllers/story');
const validator = require('../../../middlewares/story');

module.exports = (router) => {
    router.get('/admin/story', storyCtl.view);
    router.get('/admin/story/list', storyCtl.list);
    router.get('/admin/story/info', validator.checkQueOIdMiddleware, storyCtl.getInfo);
    router.post('/admin/story/create', validator.createMiddleware, storyCtl.create);
    router.post('/admin/story/update', validator.updateMiddleware, storyCtl.update);
    router.post('/admin/story/delete', validator.checkOIdMiddleware, storyCtl.delete);
    router.get('/admin/chapter/list', storyCtl.listChapter);
    router.post('/admin/chapter/create', validator.createChapterMiddleware, storyCtl.createChapter);
    router.post('/admin/chapter/update', validator.updateChapterMiddleware, storyCtl.updateChapter);
    router.post('/admin/chapter/delete', validator.checkChapteOIdMiddleware, storyCtl.deleteChapter);
};
