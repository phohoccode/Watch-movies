import fetchAPI from "./fectchAPI.js"

const detailMovie = (() => {
    let page = 0
    const section = document.querySelector('.all-movie')
    const allMovie = document.querySelector('.all-movie')
    const paginations = document.querySelector('.paginations')
    const movieType = JSON.parse(localStorage.getItem('movie-type'))
    console.log(movieType)
    const totalPages = Math.round(JSON.parse(localStorage.getItem(movieType)) / 2)

    return {
        fetchApi(currentPage) {
            const API_KEY = `${JSON.parse(localStorage.getItem('link-api'))}?page=${currentPage}&limit=20`
            console.log(API_KEY)
            fetchAPI(API_KEY)
                .then(data => {
                    console.log(data.data)
                    this.renderAllMovie(data.data, section)
                    document.title = data.data.seoOnPage.titleHead
                })
        },
        renderAllMovie(data, element) {
            const htmls = `
                <header>
                    <div class="title-name">Danh sách tất cả phim ${data.titlePage}</div>
                    <span class="current-page">${data.breadCrumb[1].name}</span>
                </header>
                <div class="movies">
                    ${data.items.map(movie => ` 
                    <div class="movie" data-slug="https://phimapi.com/phim/${movie.slug}">
                        <figure>
                            <a href="./infoMovie-page.html">
                            <img src="${movie.poster_url.includes('https://img.phimapi.com') ? movie.poster_url : 'https://img.phimapi.com/' + movie.poster_url}" alt="">
                            <div class="icon-play">
                                <i class="fa-solid fa-play"></i>
                            </div>

                            </a>
                        <span class="language">${movie.lang}</span>
                        </figure>
                        <a href="./infoMovie-page.html" class="movie-name">${movie.name}</a>
                    </div>
                    `).join('')}
                </div>
            `
            element.innerHTML = htmls
        },
        renderPaginations(quantity) {
            for (let i = 0; i < quantity; i++) {
                const page = document.createElement('div')
                page.classList.add('page')
                page.innerText = i + 1
                page.setAttribute('data-index', i + 1)
                paginations.appendChild(page)
                page.addEventListener('click', () => {
                    const index = page.dataset.index
                    this.fetchApi(index)
                    this.setActivePage(page)
                })
            }
        },
        setActivePage(element) {
            document.querySelector('.page.active').classList.remove('active')
            element.classList.add('active')
        },
        setActivePageDefault() {
            document.querySelectorAll('.page')[0].classList.add('active')
        },
        handleEvent() {
            allMovie.addEventListener('click', (e) => {
                const movie = e.target.closest('.movie')
                if (movie) {
                    const linkSlug = movie.dataset.slug
                    console.log(linkSlug)
                    localStorage.setItem('link-slug', JSON.stringify(linkSlug))
                }
            })
        },
        start() {
            this.fetchApi(page)
            this.renderPaginations(totalPages)
            this.setActivePageDefault()
            this.handleEvent()
        }
    }
})()

detailMovie.start()
