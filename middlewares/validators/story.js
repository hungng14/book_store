const { STORY_STATES } = require('../../constants/constants');
const {
    validateField, validateObjectId,
} = require('./_utils');

const { isNumberInteger, isNumber } = require('../../utils/shared');

const storyStates = Object.values(STORY_STATES);

const savedChapterValidator = {
    chapterNumber: {
        notEmpty: true,
        custom: {
            options: (val) => isNumber(val) && isNumberInteger(+val) && +val >= 0,
            errorMessage: 'Số thứ tự chương phải là số nguyên và lớn hơn 0',
        },
        errorMessage: 'Số thứ tự chương không được để trống',
    },
    title: {
        notEmpty: true,
        errorMessage: 'Tiêu đề không được để trống',
    },
    content: {
        notEmpty: true,
        errorMessage: 'Nội dung không được để trống',
    },
};

const savedValidator = {
    ...validateField('name', true),
    ...validateField('code', true),
    ...validateObjectId('categoryOId', true),
    ...validateObjectId('authorOId', false),
    ...validateField('state', true, {
        options: (val) => storyStates.includes(val),
        errorMessage: `Tình trạng sách phải là giá trị trong [${storyStates}]`,
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
