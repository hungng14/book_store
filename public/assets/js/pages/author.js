const button = document.getElementById('save');
button.addEventListener('click', () => {
    const authorName = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    axios.post('/admin/author/create', {
        name: authorName, description,
    })
        .then((response) => {
            if (response.data.success) {
                $('#name').css('border', '1px solid #ebedf2');
                swal(
                    'Success',
                    response.data.message,
                    'success',
                );
                $('#exampleModal').modal('hide');
                $('#authorTable>tbody').append(`<tr><td> ${authorName} </td><td> ${description} </td>  <td><a href="#">edit</a> <a href="#">delete</a>   </td> </tr>`);
                $('#errorName').css('display', 'none');
                $('#name').val('');
                $('#description').val('');
            } else {
                $('#name').css('border', '1px solid red');
                $('#errorName').css('display', 'block');
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

axios.get('/admin/author/list', {
})
    .then((response) => {
        const stt = 0;
        if (response.data.success) {
            response.data.data.docs.forEach((item) => {
                $('#authorTable>tbody').append(`<tr><td> ${item.name} </td><td> ${item.description} </td>  <td><a href="#">edit</a> <a href="#">delete</a>   </td> </tr>`);
            });
            console.log(response.data.data);
        }
    })
    .catch((error) => {
        console.log(error);
    });