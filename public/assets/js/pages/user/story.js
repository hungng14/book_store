/* eslint-disable no-undef */

const elemWraContent = getElement('.wrapper-content');
const storyOId = elemWraContent.getAttribute('data-storyOId');

let initPagination = null;

function listChaptersOfStory(page = 1) {
    HttpService.get('/chapter/list', {
        page,
        limit: 30,
        storyOId,
        fieldsSelected: '_id chapterNumber title',
        sortKey: 'chapterNumber',
        sortOrder: 1,
    })
        .then((response) => {
            if (response.success) {
                const { data } = response;
                initPagination(data);
                const elemWraChapter = getElement('.wrapper-chapters');
                let tmpChapters = '';
                data.docs.map((item) => {
                    tmpChapters += `<div class="item-chapter">
                      <a href="/story/${storyOId}/${item.chapterNumber}">Chương ${item.chapterNumber} (${item.title})</a> 
                    </div>`;
                });
                elemWraChapter.innerHTML = tmpChapters;
            }
        });
}
initPagination = initPaginationTemplate(listChaptersOfStory);
listChaptersOfStory();
