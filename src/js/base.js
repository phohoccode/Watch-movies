const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const handleClickButtonSearch = () => {
    const inputSearch = $('.search input');
    const searchButton = $('.search button');
    searchButton.addEventListener('click', () => {
        const valueSearch = inputSearch.value;
        if (valueSearch !== '') {
            localStorage.setItem('value-search', JSON.stringify(valueSearch));
            window.location.href = './search-page.html';
        }
    });
};

const fetchAPI = async (API_KEY) => {
    try {
        const response = await fetch(API_KEY);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};

const handleMenuClick = (element) => {
    const linkApi = element.dataset.api;
    fetchAPI(linkApi)
        .then(data => {
            console.log(data);
            localStorage.setItem('link-api', JSON.stringify(linkApi));
            const totalPage = data.data.params.pagination.totalPages;
            localStorage.setItem('total-page', JSON.stringify(totalPage));
            window.location.href = './detailMovie-page.html';
        })
        .catch(error => console.error('Error fetching API:', error));
};

const handleClickChangePage = () => {
    const menuHeader = $('.menu-header');
    menuHeader.addEventListener('click', (e) => {
        const headerItem = e.target.closest('.menu-header__item .change');
        const item = e.target.closest('.menu-header__item .item__list li a');
        
        if (headerItem) {
            e.preventDefault();
            handleMenuClick(headerItem);
        }

        if (item) {
            e.preventDefault();
            handleMenuClick(item);
        }
    })
};

export {
    $, $$,
    handleClickButtonSearch,
    handleClickChangePage
};
