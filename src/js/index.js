import { $, $$, header, footer, content,renderComponent, handleClickHeader, handleClickWatchMovie, handleFeedback } from "./base.js"
import { API_FEATUREFILM, API_CARTOON, API_TVSHOWS, API_TELEVISIONSERIES } from "./fectchAPI.js"
import fetchAPI from "./fectchAPI.js"
import movies from "./component/movies.js"
import storage from "./localStorage.js"

const root = (() => {
    let page = 1
    const sliderInner = $('.slider-inner')
    const featureFilm = $('.feature-film')
    const televisonSeris = $('.television-seris ')
    const cartoon = $('.cartoon')
    const tvShows = $('.tv-shows')

    return {
        fetchApi(currentPage) {
            const API_ALLMOVIE = `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${currentPage}`
            fetchAPI(API_ALLMOVIE)
                .then(data => {
                    this.renderSlider(data.items)
                    this.handleEvent()
                })

            fetchAPI(API_FEATUREFILM)
                .then(data => {
                    this.renderMovie(data.data, featureFilm, API_FEATUREFILM)
                    this.handleEvent()
                })

            fetchAPI(API_TELEVISIONSERIES)
                .then(data => {
                    this.renderMovie(data.data, televisonSeris, API_TELEVISIONSERIES)
                    this.handleEvent()
                })

            fetchAPI(API_CARTOON)
                .then(data => {
                    this.renderMovie(data.data, cartoon, API_CARTOON)
                    this.handleEvent()
                })

            fetchAPI(API_TVSHOWS)
                .then(data => {
                    this.renderMovie(data.data, tvShows, API_TVSHOWS)
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
        renderMovie(data, element, api) {
            const htmls = `
                <header>
                    <h3 class="title-name">${data.titlePage}</h3>
                    <a class="watch-all" data-api="${api}">
                        Xem tất cả
                        <i class="fa-light fa-chevron-right"></i>
                    </a>
                </header>
                <div class="movie-container">
                    <button class="prev">
                        <i class="fa-light fa-angle-left"></i>
                    </button>
                    <div class="movie-inner">
                        ${movies(data.items)}
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
            const screenWidth = content.clientWidth
            const maxMovies = 10
            let indexSlider = 0,
                indexMovieFeatureFilm = 0,
                indexMovieTelevisionSeri = 0,
                indexMovieCartoon = 0,
                indexMovieTvShows = 0,
                currentPageSlide,
                cuurentPageFeatureFilm,
                cuurentPageTelevionSeri,
                currentPageCartoon,
                currentPageTvShows

            this.handlePrevNextEvent(
                $('.slider-container .prev'),
                $('.slider-container .next'),
                indexSlider,
                currentPageSlide,
                maxMovies,
                screenWidth
            )

            this.handlePrevNextEvent(
                $('.feature-film .movie-container .prev'),
                $('.feature-film .movie-container .next'),
                indexMovieFeatureFilm,
                cuurentPageFeatureFilm,
                maxMovies,
                screenWidth
            )

            this.handlePrevNextEvent(
                $('.television-seris .movie-container .prev'),
                $('.television-seris .movie-container .next'),
                indexMovieTelevisionSeri,
                cuurentPageTelevionSeri,
                maxMovies,
                screenWidth
            )

            this.handlePrevNextEvent(
                $('.cartoon .movie-container .prev'),
                $('.cartoon .movie-container .next'),
                indexMovieCartoon,
                currentPageCartoon,
                maxMovies,
                screenWidth
            )

            this.handlePrevNextEvent(
                $('.tv-shows .movie-container .prev'),
                $('.tv-shows .movie-container .next'),
                indexMovieTvShows,
                currentPageTvShows,
                maxMovies,
                screenWidth
            )

            handleClickHeader(header)
            handleClickWatchMovie(content)
            handleFeedback(footer)

            const wacthNows = $$('.wacth-now')
            wacthNows.forEach(wacthNow => {
                if (wacthNow) {
                    wacthNow.addEventListener('click', () => {
                        const API_KEY = wacthNow.dataset.slug
                        console.log(API_KEY)
                        fetchAPI(API_KEY)
                            .then(data => {
                                const link_embed = []
                                data.episodes[0].server_data.forEach(link => link_embed.push(link))
                                storage.set('link_embed', link_embed)
                                storage.set('movie-name', data.movie.name)
                                window.location.href = './watchMovie-page.html'
                            })
                    })
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
            renderComponent('./componentHTML/header.html', header)
            renderComponent('./componentHTML/footer.html', footer)
        }
    }
})()
root.start()