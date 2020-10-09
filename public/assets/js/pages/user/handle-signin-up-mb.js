/* eslint-disable no-undef */

function onSignIn(e) {
    e.preventDefault();
    const data = handleValue('getValue', '#form-sign-in', { names: ['username', 'password'] });
    HttpService.post('/sign-in', data)
        .then((response) => {
            if (response.success) {
                const { infoToken } = response.data;
                loggerSuccess(response.message);
                document.cookie = `_tk_=${infoToken.token}; expires=${new Date(infoToken.exp)}`;
                document.location.reload();
            } else {
                if (response.statusCode === 1001) {
                    return loggerError(handleMsgParamsErrors(response.error));
                }
                loggerError(response.message);
            }
        });
}
const signInButton = getElement('#sign-in');
signInButton.addEventListener('click', onSignIn);
getElement('#form-sign-in').addEventListener('submit', onSignIn);

const onSignUp = (e) => {
    e.preventDefault();
    const data = handleValue('getValue', '#form-sign-up', { names: ['username', 'firstname', 'lastname', 'password', 'confirmPassword'] });
    HttpService.post('/register', data)
        .then((response) => {
            if (response.success) {
                loggerSuccess(response.message);
            } else {
                if (response.statusCode === 1001) {
                    return loggerError(handleMsgParamsErrors(response.error));
                }
                loggerError(response.message);
            }
        });
};
const signUpButton = getElement('#sign-up');
signUpButton.addEventListener('click', onSignUp);
getElement('#form-sign-up').addEventListener('submit', onSignUp);
