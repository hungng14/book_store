/* eslint-disable no-undef */

const btnSearch = getElement('#btn-search');

btnSearch.addEventListener('click', () => {
    const inputSearch = getElement('.wr-search input').value;
    if (inputSearch === '') return;
    document.location.href = `/stories/search?q=${inputSearch}`;
});
