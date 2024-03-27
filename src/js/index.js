import fetchAPI from "./fectchAPI.js"
import { API_FEATUREFILM, API_CARTOON, API_TVSHOWS, API_TELEVISIONSERIES } from "./fectchAPI.js"

const root = (() => {
    let page = 1
    const sliderInner = document.querySelector('.slider-inner')
    const featureFilm = document.querySelector('.feature-film')
    const televisonSeris = document.querySelector('.television-seris ')
    const cartoon = document.querySelector('.cartoon')
    const tvShows = document.querySelector('.tv-shows')

    return {
        fetchApi(currentPage) {
            const API_ALLMOVIE = `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${currentPage}`
            fetchAPI(API_ALLMOVIE)
                .then(data => {
                    console.log(data.items)
                    this.renderSlider(data.items)
                    this.handleEvent()
                })

            fetchAPI(API_FEATUREFILM)
                .then(data => {
                    console.log(data.data)
                    const totalPages = data.data.params.pagination.totalPages
                    localStorage.setItem('totalPage-featureFlim', JSON.stringify(totalPages))
                    this.renderMovie(data.data, featureFilm, API_FEATUREFILM, 'totalPage-featureFlim')
                    this.handleEvent()
                })

            fetchAPI(API_TELEVISIONSERIES)
                .then(data => {
                    console.log(data.data)
                    const totalPages = data.data.params.pagination.totalPages
                    localStorage.setItem('totalPage-televisionSeries', JSON.stringify(totalPages))
                    this.renderMovie(data.data, televisonSeris, API_TELEVISIONSERIES, 'totalPage-televisionSeries')
                    this.handleEvent()
                })

            fetchAPI(API_CARTOON)
                .then(data => {
                    console.log(data.data)
                    const totalPages = data.data.params.pagination.totalPages
                    localStorage.setItem('totalPage-cartoon', JSON.stringify(totalPages))
                    this.renderMovie(data.data, cartoon, API_CARTOON, 'totalPage-cartoon')
                    this.handleEvent()
                })

            fetchAPI(API_TVSHOWS)
                .then(data => {
                    console.log(data.data)
                    const totalPages = data.data.params.pagination.totalPages
                    localStorage.setItem('totalPage-tvshows', JSON.stringify(totalPages))
                    this.renderMovie(data.data, tvShows, API_TVSHOWS, 'totalPage-tvshows')
                    this.handleEvent()
                })


        },
        renderSlider(data) {
            const htmls = data.map(slider => `
                <div class="slide">
                    <figure>
                        <img src="${slider.thumb_url.includes('https://img.phimapi.com') ? slider.thumb_url : 'https://img.phimapi.com/' + slider.thumb_url}" alt="">
                    </figure>
                    <div class="slider-info">
                        <h3>${slider.name}</h3>
                        <div class="slider-info__bottom">
                            <button href="./watchMovie-page.html" class="wacth-now" data-slug="https://phimapi.com/phim/${slider.slug}">
                                <i class="fa-solid fa-play"></i>
                            Xem ngay
                            </button>
                            <span class="year">Xuất bản ${slider.year}</span>
                        </div>
                    </div>
                </div>
            `).join('')
            sliderInner.innerHTML = htmls
        },
        renderMovie(data, element, api, typeMovie) {
            const htmls = `
                <header>
                    <h3 class="title-name">${data.titlePage}</h3>
                    <a class="watch-all" href="./detailMovie-page.html" data-type="${typeMovie}" data-api="${api}">Xem tất cả</a>
                </header>
                <div class="movie-container">
                    <button class="prev">
                        <i class="fa-light fa-angle-left"></i>
                    </button>
                    <div class="movie-inner">
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
                    <button class="next">
                        <i class="fa-light fa-angle-right"></i>
                    </button>
                </div>`
            element.innerHTML = htmls
        },
        handlePrevNextEvent(prevButton, nextButton, indexMovie, currentPage, maxMovies, screenWidth) {
            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    const elementAnimate = prevButton.nextElementSibling
                    const { widthElement, displayQuantity } = this.getNumberDisplayOnPage(elementAnimate, screenWidth)
                    currentPage = displayQuantity + indexMovie
                    if (currentPage > 0) {
                        if (indexMovie > 0) {
                            indexMovie--
                        }
                        console.log('index: ', indexMovie, 'currentPage', currentPage)
                        elementAnimate.style.transform = `translate3d(-${indexMovie * widthElement}px, 0, 0)`
                    }
                })
            }

            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    const elementAnimate = nextButton.previousElementSibling
                    const { widthElement, displayQuantity } = this.getNumberDisplayOnPage(elementAnimate, screenWidth)
                    currentPage = displayQuantity + indexMovie
                    if (currentPage < maxMovies) {
                        if (indexMovie < maxMovies) {
                            indexMovie++
                        }
                        console.log('index: ', indexMovie, 'currentPage', currentPage)
                        elementAnimate.style.transform = `translate3d(-${indexMovie * widthElement}px, 0, 0)`
                    }
                })
            }
        },

        handleEvent() {
            const content = document.querySelector('.content')
            const screenWidth = content.clientWidth
            const maxMovies = 10
            let indexSlider = 0
            let indexMovieFeatureFilm = 0
            let indexMovieTelevisionSeri = 0
            let indexMovieCartoon = 0
            let indexMovieTvShows = 0
            let currentPageSlide, cuurentPageFeatureFilm, cuurentPageTelevionSeri, currentPageCartoon, currentPageTvShows

            this.handlePrevNextEvent(
                document.querySelector('.slider-container .prev'),
                document.querySelector('.slider-container .next'),
                indexSlider,
                currentPageSlide,
                maxMovies,
                screenWidth
            )

            this.handlePrevNextEvent(
                document.querySelector('.feature-film .movie-container .prev'),
                document.querySelector('.feature-film .movie-container .next'),
                indexMovieFeatureFilm,
                cuurentPageFeatureFilm,
                maxMovies,
                screenWidth
            )

            this.handlePrevNextEvent(
                document.querySelector('.television-seris .movie-container .prev'),
                document.querySelector('.television-seris .movie-container .next'),
                indexMovieTelevisionSeri,
                cuurentPageTelevionSeri,
                maxMovies,
                screenWidth
            )

            this.handlePrevNextEvent(
                document.querySelector('.cartoon .movie-container .prev'),
                document.querySelector('.cartoon .movie-container .next'),
                indexMovieCartoon,
                currentPageCartoon,
                maxMovies,
                screenWidth
            )

            this.handlePrevNextEvent(
                document.querySelector('.tv-shows .movie-container .prev'),
                document.querySelector('.tv-shows .movie-container .next'),
                indexMovieTvShows,
                currentPageTvShows,
                maxMovies,
                screenWidth
            )

            const wacthNows = document.querySelectorAll('.wacth-now')
            wacthNows.forEach(wacthNow => {
                if (wacthNow) {
                    wacthNow.addEventListener('click', () => {
                        const API_KEY = wacthNow.dataset.slug
                        console.log(API_KEY)
                        fetchAPI(API_KEY)
                            .then(data => {
                                console.log(data)
                                const link_embed = []
                                data.episodes[0].server_data.forEach(link => link_embed.push(link))
                                console.log(link_embed)
                                localStorage.setItem('link_embed', JSON.stringify(link_embed))
                                localStorage.setItem('movie-name', JSON.stringify(data.movie.name))
                                window.location.href = './watchMovie-page.html'
                            })
                    })
                }
            })

            content.addEventListener('click', (e) => {
                const movie = e.target.closest('.movie')
                const watchAllMovie = e.target.closest('.watch-all')
                if (movie) {
                    const linkSlug = movie.dataset.slug
                    console.log(linkSlug)
                    localStorage.setItem('link-slug', JSON.stringify(linkSlug))
                }
                
                if (watchAllMovie) {
                    const linkApi = watchAllMovie.dataset.api
                    const dataType = watchAllMovie.dataset.type
                    localStorage.setItem('link-api', JSON.stringify(linkApi))
                    localStorage.setItem('movie-type', JSON.stringify(dataType))
                }
            })

        },
        getNumberDisplayOnPage(elementAnimate, screenWidth) {
            const element = elementAnimate.children[0]
            const computedStyle = window.getComputedStyle(element)
            const widthElement = parseFloat(computedStyle.getPropertyValue('width'))
            const percentage = (widthElement / screenWidth) * 100
            const displayQuantity = Math.round(100 / percentage)
            return { widthElement, displayQuantity }
        },
        start() {
            this.fetchApi(page)
        }
    }
})()
root.start()