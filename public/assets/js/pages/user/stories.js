/* eslint-disable no-undef */

const getParamSearch = () => {
    const urlString = document.URL; // window.location.href
    const url = new URL(urlString);
    const query = url.searchParams.get('q');
    return query;
};

const handleLoading = (display) => {
    const elmLd = getElement('.block-ld');
    if (display === 'none') {
        elmLd.classList.add('hide');
    } else {
        elmLd.classList.remove('hide');
    }
};

let initPagination = null;

function listStories(page = 1) {
    handleLoading('block');
    HttpService.get('/stories/list', {
        page,
        status: 'Active',
        limit: 20,
        showView: true,
        searchCategory: getParamSearch(),
    })
        .then((response) => {
            if (response.success) {
                const { data } = response;
                initPagination(data);
                const elemWraBooks = getElement('.book-list');
                let tmpChapters = '';
                data.docs.map((item) => {
                    tmpChapters += ` <div class="col-md-6">
                    <div class="book-detail d-flex">
                      <div class="book-detail-left profile-img">
                        <img
                          src="${item.profileImage || '/assets/images/book_logo.png'}"
                          alt="">
                      </div>
                      <div class="book-detail-right">
                        <h4><a href="/story/${item._id}">${item.name}</a></h4>
                        <p class="text-muted small">${(item.category || {}).name || ''}</p>
                        <p class="description">
                          ${item.shortDescription || ''}
                        </p>
                        <p class="text-muted">
                          <span><i class="mdi mdi-library" aria-hidden="true"></i> NOT FULL</span>
                          <span><i class="mdi mdi-eye" aria-hidden="true" style="margin-left: 10px;"></i> ${(item.views || {}).count || 0}</span>
                        </p>
                      </div>
                    </div>
                  </div>`;
                });
                elemWraBooks.innerHTML = tmpChapters;
            }
        }).finally(() => handleLoading('none'));
}
initPagination = initPaginationTemplate(listStories);
listStories();
