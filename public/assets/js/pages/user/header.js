/* eslint-disable no-undef */

function onSearch(e) {
    e.preventDefault();
    const inputSearch = getElement('.wr-search input').value;
    if (inputSearch === '') return;
    document.location.href = `/stories/search?q=${inputSearch}`;
}

const btnSearch = getElement('#btn-search');
btnSearch.addEventListener('click', onSearch);

getElement('#form-search').addEventListener('submit', onSearch);

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
