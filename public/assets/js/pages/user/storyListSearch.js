const getParamSearch = () => {
    const urlString = document.URL; // window.location.href
    const url = new URL(urlString);
    const query = url.searchParams.get('q');
    return query;
};

let initPagination = null;

function listSearch(page = 1) {
    HttpService.get('/stories/list', {
        page,
        searchBookNameOrCategory: getParamSearch(),
        showChapter: true,
    })
        .then((response) => {
            if (response.success) {
                const { data } = response;
                initPagination(data);
                $('.wrapper-list-books').empty();
                data.docs.map((item) => {
                    const chapter = item.chapter || {};
                    const chapterNumber = chapter.chapterNumber ?? '';
                    $('.wrapper-list-books').append(`
                    <div class="item-book">
                        <div class="profile-img">
                          <img src="${item.profileImage || '/assets/images/book_logo.png'}" alt="">
                        </div>
                        <div class="book-name">
                          <h3>
                            <a href="/story/${item._id}">${item.name}</a>
                          </h3>
                        </div>
                        <div class="chapter-name">
                          <h4>
                            <a href="/story/${item._id}/${chapterNumber}">${chapter.title || ''}</a>
                          </h4>
                        </div>
                        <div class="chapter-number">
                          <span>Chương ${chapterNumber}</span>
                        </div>
                        <div class="category">
                          <span>${(item.category || {}).name || ''}</span>
                        </div>
                      </div>
                    `);
                });
            }
        });
}
initPagination = initPaginationTemplate(listSearch);
listSearch();
