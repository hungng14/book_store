const { STORY_STATES } = require('../../constants/constants');
const {
    validateField, validateObjectId,
} = require('./_utils');

const { isNumberInteger } = require('../../utils/shared');

const storyStates = Object.values(STORY_STATES);

const savedChapterValidator = {
    chapterNumber: {
        notEmpty: true,
        custom: {
            options: (val) => isNumberInteger(val) && +val >= 0,
            errorMessage: 'chapterNumber must be number integer and greater than or equal 0',
        },
        errorMessage: 'chapterNumber is required',
    },
    title: {
        notEmpty: true,
        errorMessage: 'title is required',
    },
    content: {
        notEmpty: true,
        errorMessage: 'content is required',
    },
};

const savedValidator = {
    ...validateField('name', true),
    ...validateField('code', true),
    ...validateObjectId('categoryOId', true),
    ...validateObjectId('authorOId', false),
    ...validateField('state', true, {
        options: (val) => storyStates.includes(val),
        errorMessage: `state must be value in [${storyStates}]`,
    }),
    ...validateField('source', false),
    ...validateField('profileImage', false),
    ...validateField('description', false),
};

const storyOIdValidator = validateObjectId('storyOId', true);
const chapterOIdValidator = validateObjectId('chapterOId', true);

module.exports = {
    createValidator: savedValidator,
    storyOIdValidator,
    updateValidator: { ...savedValidator, ...storyOIdValidator },
    createChapterValidator: { ...savedChapterValidator, ...storyOIdValidator },
    updateChapterValidator: { ...savedChapterValidator, ...chapterOIdValidator, ...storyOIdValidator },
    chapterOIdValidator,
};
