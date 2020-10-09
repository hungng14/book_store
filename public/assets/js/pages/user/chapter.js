/* eslint-disable no-undef */

const elemBlkChapContent = getElement('.block-chapter-content');
const storyOId = elemBlkChapContent.getAttribute('data-storyOId');
const chapterNumber = elemBlkChapContent.getAttribute('data-chapterNumber');

const closePopoverOpen = () => {
    const popoverOpen = getElement('.popover-actions.open');
    popoverOpen && popoverOpen.classList.remove('open');
};

function prevChapter() {
    document.location.href = `/story/${storyOId}/${+chapterNumber - 1}`;
}

function nextChapter() {
    document.location.href = `/story/${storyOId}/${+chapterNumber + 1}`;
}

getAllElement('.item-arrow-left').forEach((elm) => {
    elm.addEventListener('click', () => {
        prevChapter();
    });
});

getAllElement('.item-arrow-right').forEach((elm) => {
    elm.addEventListener('click', () => {
        nextChapter();
    });
});

// handle audio
let isPlaying = false;

const readContentElm = getElement('.read-content');
const titleChapter = getElement('.title-chapter>h2').textContent;
const text = `${titleChapter}:${readContentElm.textContent}`;

const mdiElm = getElement('#play-audio i.mdi');
const playAudio = getElement('#play-audio');
const onStart = () => {};

const onEnd = () => {
    isPlaying = false;
    mdiElm.classList.add('mdi-play-circle');
    mdiElm.classList.remove('mdi-pause-circle');
};
playAudio.addEventListener('click', () => {
    if (mdiElm.classList.contains('mdi-play-circle')) {
        if (isPlaying) {
            responsiveVoice.resume();
        } else {
            responsiveVoice.speak(text, 'Vietnamese Female', {
                onstart: onStart,
                onend: onEnd,
            });
        }
        mdiElm.classList.remove('mdi-play-circle');
        mdiElm.classList.add('mdi-pause-circle');
    } else {
        mdiElm.classList.add('mdi-play-circle');
        mdiElm.classList.remove('mdi-pause-circle');
        responsiveVoice.pause();
    }
    isPlaying = true;
    closePopoverOpen();
});

getElement('#stop-audio').addEventListener('click', () => {
    responsiveVoice.cancel();
    mdiElm.classList.add('mdi-play-circle');
    mdiElm.classList.remove('mdi-pause-circle');
    isPlaying = false;
    closePopoverOpen();
});

// actions
const showChapterElm = getElement('#show-chapters');
const dropdownChaptersElm = getElement('.wrapper-chapters');
showChapterElm && showChapterElm.addEventListener('click', () => {
    if (dropdownChaptersElm.classList.contains('open')) {
        dropdownChaptersElm.classList.remove('open');
    } else {
        closePopoverOpen();
        dropdownChaptersElm.classList.add('open');
    }
});

let initPagination = null;

function listChaptersOfStory(page = 1) {
    HttpService.get('/chapter/list', {
        page,
        limit: 20,
        storyOId,
        fieldsSelected: '_id chapterNumber title',
        sortKey: 'chapterNumber',
        sortOrder: 1,
    })
        .then((response) => {
            if (response.success) {
                const {
                    data,
                } = response;
                initPagination(data);
                const elemWraChapter = getElement('.dropdown-chapters');
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

const settingBgElm = getElement('#settings');
const wrapSettingsElm = getElement('.wrapper-settings');
settingBgElm && settingBgElm.addEventListener('click', () => {
    if (wrapSettingsElm.classList.contains('open')) {
        wrapSettingsElm.classList.remove('open');
    } else {
        closePopoverOpen();
        wrapSettingsElm.classList.add('open');
    }
});

const chapterContentElm = getElement('.chapter-content');
const itemBgElms = getAllElement('.item-bg');
itemBgElms.forEach((elm) => {
    elm.addEventListener('click', () => {
        const dataBg = elm.getAttribute('data-background');
        if ((chapterContentElm.classList.contains('bg-white-selected') && dataBg === 'white')
        || (chapterContentElm.classList.contains('bg-black-selected') && dataBg === 'black')) return;
        itemBgElms.forEach((elmIt) => {
            elmIt.classList.remove('active');
        });
        elm.classList.add('active');
        if (dataBg === 'white') {
            chapterContentElm.classList.add('bg-white-selected');
            chapterContentElm.classList.remove('bg-black-selected');
        }
        if (dataBg === 'black') {
            chapterContentElm.classList.remove('bg-white-selected');
            chapterContentElm.classList.add('bg-black-selected');
        }
    });
});

const btnClosePopoverElms = getAllElement('.close-popover');
btnClosePopoverElms.forEach((elm) => {
    elm.addEventListener('click', () => {
        getElement('.popover-actions.open').classList.remove('open');
    });
});
