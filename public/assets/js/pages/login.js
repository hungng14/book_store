const signInButton = document.getElementById('sign-in');
signInButton.addEventListener('click', () => {
    const elemUsername = document.getElementById('username');
    const elemPassword = document.getElementById('password');
    axios.post('/admin/sign-in', {
        username: elemUsername.value, password: elemPassword.value,
    })
        .then((response) => {
            if (response.data.success) {
                document.location.href = '/admin/dashboard';
            }
        })
        .catch((error) => {
            console.log(error);
        });
});
