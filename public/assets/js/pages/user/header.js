/* eslint-disable no-undef */
function listCategory() {
    HttpService.get('/category/list-active')
        .then((response) => {
            if (response.success) {
                const elmListCategory = getElement('.list-category .sub-nav');
                let template = '';
                response.data.map((item) => {
                    template += `<li>
                                <a href="/stories?q=${item.name}">${item.name}</a>
                            </li>`;
                });
                elmListCategory.innerHTML = template;
            }
        });
}
listCategory();
