let initPagination = null;

function listBookmark(page = 1) {
    HttpService.get('/bookmark/list', { page, status: 'Active' })
        .then((response) => {
            if (response.success) {
                const { data } = response;
                initPagination(data);
                $('.wrapper-list-books').empty();
                data.docs.map((item) => {
                    const story = item.story || {};
                    const chapter = item.chapter || story.chapter || {};
                    const chapterNumber = chapter.chapterNumber ?? '';
                    $('.wrapper-list-books').append(`
                    <div class="item-book">
                        <div class="profile-img">
                          <img src="${story.profileImage || '/assets/images/book_logo.png'}" alt="">
                        </div>
                        <div class="book-name">
                          <h3>
                            <a href="/story/${story._id || ''}">${story.name || ''}</a>
                          </h3>
                        </div>
                        <div class="chapter-name">
                          <h4>
                            <a href="/story/${story._id || ''}/${chapterNumber}">${chapter.title || ''}</a>
                          </h4>
                        </div>
                        <div class="chapter-number">
                          <span>Chuong ${chapterNumber}</span>
                        </div>
                        <div class="category">
                          <span>Kinh di</span>
                        </div>
                      </div>
                    `);
                });
            }
        });
}
initPagination = initPaginationTemplate(listBookmark);
listBookmark();
