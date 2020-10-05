/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function listStoryNewest() {
    HttpService.get('/story/list-active', {
        limit: 3,
        sortKey: 'createdAt',
        sortOrder: -1,
        fieldsSelected: '_id name shortDescription chapterNewest profileImage',
    })
        .then((response) => {
            if (response.success) {
                const elmWraItSlider = getElement('.wrapper-items-slider');
                let template = '';
                response.data.map((item) => {
                    template += `<a href="/story/${item._id}"><div class="wrapper-item-slider">
                        <img src="https://truyencv.com/images/poster/do-de-cua-ta-deu-la-trum-phan-dien-poster-1578750543-200x300.jpg"
                            alt="">
                        <div class="wrapper-item-detail">
                            <h3 class="wrapper-item-title">${item.name}</h3>
                            <p class="wrapper-item-description">
                                ${item.shortDescription || ''}
                            </p>
                        </div>
                    </div></a>`;
                });
                elmWraItSlider.innerHTML = template;
            }
        });
}
listStoryNewest();

function listStoryUpdateNewest() {
    HttpService.get('/story/list-active', {
        limit: 10,
        sortKey: 'updatedAt',
        sortOrder: -1,
        fieldsSelected: '_id name chapterNewest profileImage',
    })
        .then((response) => {
            if (response.success) {
                $('#books-new-updated').empty();
                response.data.map((item) => {
                    $('#books-new-updated').append(`
                      <div class="book-item">
                          <div class="book-item-detail">
                              <img src="https://truyencv.com/images/poster/cuc-vo-poster-1541267221-200x300.jpg" alt="">
                              <div class="detail">
                                  <h3 class="book-item-title">
                                    <a href="/story/${item._id}">${item.name}</a>
                                  </h3>
                                  <p class="book-item-chapter-crt">Chương ${(item.chapterNewest || {}).chapterNumber || 0}</p>
                              </div>
                          </div>
                          <div class="book-item-action">
                              <a href="/story/${item._id}/${(item.chapterNewest || {}).chapterNumber}">Đọc tiếp</a>
                          </div>
                      </div>`);
                });
            }
        });
}
listStoryUpdateNewest();

function listStoryTopView() {
    HttpService.get('/view-statistic/list', {
        limit: 10,
        sortKey: 'count',
        sortOrder: -1,
    })
        .then((response) => {
            console.log(response)
            if (response.success) {
                // const elmWraItSlider = getElement('.wrapper-items-slider');
                // let template = '';
                // response.data.map((item) => {
                //     template += `<a href="/story/${item._id}"><div class="wrapper-item-slider">
                //         <img src="https://truyencv.com/images/poster/do-de-cua-ta-deu-la-trum-phan-dien-poster-1578750543-200x300.jpg"
                //             alt="">
                //         <div class="wrapper-item-detail">
                //             <h3 class="wrapper-item-title">${item.name}</h3>
                //             <p class="wrapper-item-description">
                //                 ${item.shortDescription || ''}
                //             </p>
                //         </div>
                //     </div></a>`;
                // });
                // elmWraItSlider.innerHTML = template;
            }
        });
}
listStoryTopView();
