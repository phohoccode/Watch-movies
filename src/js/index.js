import fetchAPI from "./fectchAPI.js"
import { API_ALLMOVIE, API_FEATUREFILM, API_CARTOON, API_TVSHOWS, API_TELEVISIONSERIES } from "./fectchAPI.js"

// const prev = document.querySelector('.prev')
// const next = document.querySelector('.next')
// const sliderInner = document.querySelector('.slider-inner')
// const sliders = document.querySelectorAll('.slide')
// const movieInner = document.querySelector('.movie-inner')
// const movies = document.querySelectorAll('.movie')
// console.log(sliders)
// let index = 0
// const slideWidth = document.querySelector('.slide').clientWidth;
// const movieWidth = document.querySelector('.movie').clientWidth;
// console.log(slideWidth)
// prev.addEventListener('click', () => {
//     console.log('done')
//     index--
//     if (index < 0) {
//         index = sliders.length - 1
//     }
//     sliderInner.style.transform = `translate3d(-${index * slideWidth}px, 0, 0)`;
// })
// next.addEventListener('click', () => {
//     index++
//     if (index > sliders.length - 1) {
//         index = 0
//     }
//     sliderInner.style.transform = `translate3d(-${index * slideWidth}px, 0, 0)`
// })

const root = (() => {
    let page = 1
    const sliderInner = document.querySelector('.slider-inner')
    const featureFilm = document.querySelector('.feature-film')
    const televisonSeris = document.querySelector('.televison-seris ')
    const cartoon = document.querySelector('.cartoon')
    const tvShows = document.querySelector('.tv-shows')
    const sliderContainer = document.querySelector('.slider-container')
    const movieContainer = document.querySelector('.movie-container')

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
                    this.renderMovie(data.data, featureFilm)
                    this.handleEvent()
                })

            fetchAPI(API_TELEVISIONSERIES)
                .then(data => {
                    console.log(data.data)
                    this.renderMovie(data.data, televisonSeris)
                    this.handleEvent()
                })

            fetchAPI(API_CARTOON)
                .then(data => {
                    console.log(data.data)
                    this.renderMovie(data.data, cartoon)
                    this.handleEvent()
                })

            fetchAPI(API_TVSHOWS)
                .then(data => {
                    console.log(data.data)
                    this.renderMovie(data.data, tvShows)
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
                            <button>
                                <i class="fa-solid fa-play"></i>
                                <a href="https://phimapi.com/phim/${slider.slug}"></a>
                            Xem ngay
                            </button>
                            <span class="year">${slider.year}</span>
                        </div>
                    </div>
                </div>
            `).join('')
            sliderInner.innerHTML = htmls
        },
        renderMovie(data, element) {
            const htmls = `
                <header>
                    <h3 class="title-name">${data.titlePage}</h3>
                    <a href="">Xem tất cả</a>
                </header>
                <div class="movie-container">
                    <button class="prev">
                        <i class="fa-light fa-angle-left"></i>
                    </button>
                    <div class="movie-inner">
                        ${data.items.map(movie => ` 
                            <div class="movie">
                                <figure>
                                    <a href="" data-slug="https://phimapi.com/phim/${movie.slug}"></a>
                                    <img src="${movie.poster_url.includes('https://img.phimapi.com') ? movie.poster_url : 'https://img.phimapi.com/' + movie.poster_url}" alt="">
                                    <div class="icon-play">
                                    <i class="fa-solid fa-play"></i>
                                </div>
                                </figure>
                                <span class="language">${movie.lang}</span>
                                <a href="" class="movie-name">${movie.name}</a>
                            </div>
                        `).join('')}
                    </div>
                    <button class="next">
                        <i class="fa-light fa-angle-right"></i>
                    </button>
                </div>`
            element.innerHTML = htmls
        },
        handleEvent() {
            let cuurentPage = 0
            sliderContainer.addEventListener('click', (e) => {
                const slides = document.querySelectorAll('.slide')
                const slideWidth = document.querySelector('.slide').clientWidth
                const prev = e.target.closest('.slider-container .prev')
                const next = e.target.closest('.slider-container .next')

                if (prev) {
                    cuurentPage--
                    if (cuurentPage < 0) {
                        cuurentPage = slides.length - 1
                    }
                    sliderInner.style.transform = `translate3d(-${cuurentPage * slideWidth}px, 0, 0)`;
                }

                if (next) {
                    cuurentPage++
                    if (cuurentPage > slides.length - 1) {
                        cuurentPage = 0
                    }
                    sliderInner.style.transform = `translate3d(-${cuurentPage * slideWidth}px, 0, 0)`;
                }
            })
        },

        start() {
            this.fetchApi(page)
        }
    }
})()
root.start()