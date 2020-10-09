/* eslint-disable no-undef */

const btnSearch = getElement('#btn-search');

btnSearch.addEventListener('click', () => {
    const inputSearch = getElement('.wr-search input').value;
    if (inputSearch === '') return;
    document.location.href = `/stories/search?q=${inputSearch}`;
});

const dropdownItemLogout = getElement('#dropdown-item-logout');
dropdownItemLogout && dropdownItemLogout.addEventListener('click', () => {
    document.cookie = '_tk_=;';
    document.location.reload();
});
const profileDropdown = getElement('#profileDropdown');
const dropdown = getElement('.dropdown-menu.navbar-dropdown');
profileDropdown && profileDropdown.addEventListener('click', () => {
    if (dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
    } else {
        dropdown.classList.add('open');
    }
});
