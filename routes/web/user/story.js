const storyCtl = require('../../../controllers/story');

module.exports = (router) => {
    router.get('/story/:storyOId', storyCtl.viewInfoUser);
    router.get('/story/:storyOId/:chapterNumber', storyCtl.viewChapter);
    router.get('/story/list-active', storyCtl.listActive);
};
