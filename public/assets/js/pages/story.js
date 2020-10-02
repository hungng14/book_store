/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const scope = {};
getElement('#btn-show-modal-create').addEventListener('click', () => {
    getElement('#form-modal').setAttribute('data-action', 'create');
    getElement('#form-modal').removeAttribute('data-storyOId');
    handleValue('resetValue', '#form-modal', { names: ['code', 'name', 'source', 'state', 'categoryOId', 'authorOId', 'description'] });
});

const button = getElement('#save');
button.addEventListener('click', () => {
    const action = getElement('#form-modal').getAttribute('data-action');
    if (action === 'create') {
        const data = handleValue('getValue', '#form-modal', { names: ['code', 'name', 'source', 'state', 'categoryOId', 'authorOId', 'description'] });
        HttpService.post('/admin/story/create', data).then((response) => {
            if (response.success) {
                loggerSuccess(response.message);
                listStory();
                handleValue('resetValue', '#form-modal', { names: ['code', 'name', 'source', 'state', 'categoryOId', 'authorOId', 'description'] });
            } else {
                loggerError(response.message);
            }
        });
    } else {
        const data = handleValue('getValue', '#form-modal', { names: ['code', 'name', 'source', 'state', 'categoryOId', 'authorOId', 'description'] });
        data.storyOId = getElement('#form-modal').getAttribute('data-storyOId');
        HttpService.post('/admin/story/update', data).then((response) => {
            if (response.success) {
                $('#form-modal').modal('hide');
                loggerSuccess(response.message);
                listStory();
                // handleValue('resetValue', '#form-modal', { names: ['code', 'name', 'source', 'state', 'categoryOId', 'authorOId', 'description'] });
            } else {
                loggerError(response.message);
            }
        });
    }
});

let initPagination = null;

function listStory(page = 1) {
    HttpService.get('/admin/story/list', { page })
        .then((response) => {
            if (response.success) {
                const { data } = response;
                const startNo = countNo(data.page, data.limit);
                initPagination(data);
                $('#story-table>tbody').empty();
                data.docs.map((item, idx) => {
                    $('#story-table>tbody').append(`<tr>
                            <td> ${idx + startNo} </td>
                            <td> ${item.code} </td>
                            <td> ${item.name} </td>
                            <td> ${(item.category || {}).name || ''}</td>
                            <td> ${(item.author || {}).name || ''}</td>
                            <td> ${item.state} </td>
                            <td> ${item.status || ''} </td>
                            <td>
                                <button type="button" onclick="showChaptersOfStory('${item._id}')"
                                    title="Xem chi tiết các chương của truyện"
                                    class="btn btn-icon btn-warning btn-rounded">
                                    <i class="mdi mdi-library-books"></i>
                                </button>
                                <button type="button" onclick="showInfo('${item._id}')"
                                    data-toggle="modal" data-target="#form-modal" class="btn btn-icon btn-info btn-rounded">
                                    <i class="mdi mdi-lead-pencil"></i>
                                </button>
                                <button type="button" onclick="onDelete('${item._id}')" 
                                    class="btn btn-icon btn-danger btn-rounded">
                                    <i class="mdi mdi-close-circle"></i>
                                </button>
                            </td> 
                        </tr>`);
                });
            }
        });
}
initPagination = initPaginationTemplate(listStory);
listStory();

function showChaptersOfStory(storyOId) {
    document.location.href = `/admin/story/${storyOId}/chapters`;
}

function onDelete(storyOId) {
    swal({
        title: 'Bạn có chắc muốn xóa?',
        text: 'Sau khi xóa, dữ liệu sẽ bị mất!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    }).then((ok) => {
        if (ok) {
            HttpService.post('/admin/story/delete', { storyOId }).then((response) => {
                if (response.success) {
                    loggerSuccess(response.message);
                    listStory();
                } else {
                    loggerError(response.message);
                }
            });
        }
    });
}

const listAuthor = () => {
    HttpService.get('/admin/author/list-active')
        .then((response) => {
            if (response.success) {
                scope.authors = response.data;
                appendOptionOfSelect('authors', response.data, {
                    firstText: 'Không chọn',
                    propText: 'name',
                    propValue: '_id',
                });
            }
        });
};
listAuthor();

const listCategory = () => {
    HttpService.get('/admin/category/list-active')
        .then((response) => {
            if (response.success) {
                scope.categories = response.data;
                appendOptionOfSelect('categories', response.data, {
                    firstText: 'Không chọn',
                    propText: 'name',
                    propValue: '_id',
                });
            }
        });
};
listCategory();

function showInfo(storyOId) {
    HttpService.get('/admin/story/info', { storyOId })
        .then((response) => {
            if (response.success) {
                const story = response.data;
                getElement('#form-modal').setAttribute('data-action', 'update');
                getElement('#form-modal').setAttribute('data-storyOId', story._id);
                handleValue('setValue', '#form-modal', {
                    data: [
                        { name: 'code', value: story.code },
                        { name: 'name', value: story.name },
                        { name: 'authorOId', value: story.authorOId },
                        { name: 'categoryOId', value: story.categoryOId },
                        { name: 'description', value: story.description },
                        { name: 'source', value: story.source },
                        { name: 'state', value: story.state },
                    ],
                });
            }
        });
}
