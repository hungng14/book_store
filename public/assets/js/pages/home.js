/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function listStoryUpdateNewest() {
    HttpService.get('/story/list-active', {
        limit: 10,
        sortKey: 'updatedAt',
        sortOrder: -1,
        fieldsSelected: '_id name chapterNewest profileImage',
    })
        .then((response) => {
            console.log(response);
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
                              <a href="#">Đọc tiếp</a>
                          </div>
                      </div>`);
                });
            }
        });
}
listStoryUpdateNewest();
