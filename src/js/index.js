import fetchAPI from "./fectchAPI.js"
import { API_ALLMOVIE, API_FEATUREFILM, API_CARTOON, API_TVSHOWS, API_TELEVISIONSERIES } from "./fectchAPI.js"

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
                            <span class="year">Xuất bản ${slider.year}</span>
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
                                <span class="language">${movie.lang}</span>
                                </figure>
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
            const content = document.querySelector('.content')
            const screenWidth = content.clientWidth
            const maxMovie = 10
            let indexSlide = 0
            let indexMovie = 0
            let currentPageSide
            let currentPageMovie

            const sliderContainer = document.querySelector('.slider-container')
            const movieContainers = document.querySelectorAll('.movie-container')

            sliderContainer.addEventListener('click', (e) => {
                const prev = e.target.closest('.prev')
                const next = e.target.closest('.next')
                const elementAnimate = next ? next.previousElementSibling : prev.nextElementSibling
                const { widthElement, displayQuantity } = this.getNumberDisplayOnPage(elementAnimate, screenWidth)
                currentPageSide = displayQuantity + indexSlide
                if (prev && currentPageSide > 0) {
                    if (indexSlide > 0) {
                        indexSlide--
                    }
                    console.log('idex: ', indexSlide, 'currentPageSide', currentPageSide)
                    elementAnimate.style.transform = `translate3d(-${indexSlide * widthElement}px, 0, 0)`
                }

                if (next && currentPageSide < maxMovie) {
                    if (indexSlide < maxMovie) {
                        indexSlide++
                    }
                    console.log('idex: ', indexSlide, 'currentPageSide', currentPageSide, 'quanity', maxMovie)
                    elementAnimate.style.transform = `translate3d(-${indexSlide * widthElement}px, 0, 0)`
                }
            })

            const prevFeatureFilm = document.querySelector('.feature-film .movie-container .prev')
            const nextFeatureFilm = document.querySelector('.feature-film .movie-container .next')
            let indexMovieFeatureFilm = 0
            let cuurentPageFeatureFilm

            if (prevFeatureFilm) {
                prevFeatureFilm.addEventListener('click', () => {
                    const elementAnimate = prevFeatureFilm.nextElementSibling
                    const { widthElement, displayQuantity } = this.getNumberDisplayOnPage(elementAnimate, screenWidth)
                    cuurentPageFeatureFilm = displayQuantity + indexMovieFeatureFilm
                    if (cuurentPageFeatureFilm > 0) {
                        if (indexMovieFeatureFilm > 0) {
                            indexMovieFeatureFilm--
                        }
                        console.log('idex: ', indexMovieFeatureFilm, 'currentPageMovie', cuurentPageFeatureFilm)
                        elementAnimate.style.transform = `translate3d(-${indexMovieFeatureFilm * widthElement}px, 0, 0)`
                    }
                    this.handlePrevElement(cuurentPageFeatureFilm, indexMovieFeatureFilm, elementAnimate, widthElement)
                })
            }

            if (nextFeatureFilm) {
                nextFeatureFilm.addEventListener('click', () => {
                    const elementAnimate = nextFeatureFilm.previousElementSibling
                    const { widthElement, displayQuantity } = this.getNumberDisplayOnPage(elementAnimate, screenWidth)
                    cuurentPageFeatureFilm = displayQuantity + indexMovieFeatureFilm
                    if (cuurentPageFeatureFilm < maxMovie) {
                        if (indexMovieFeatureFilm < maxMovie) {
                            indexMovieFeatureFilm++
                        }
                        console.log('idex: ', indexMovieFeatureFilm, 'currentPageMovie', cuurentPageFeatureFilm)
                        elementAnimate.style.transform = `translate3d(-${indexMovieFeatureFilm * widthElement}px, 0, 0)`
                    }
                    // this.handlePrevElement(cuurentPageFeatureFilm, indexMovieFeatureFilm, elementAnimate, widthElement, maxMovie)


                })
            }


            // movieContainers.forEach(movieContainer => {
            //     movieContainer.addEventListener('click', (e) => {
            //         const prev = e.target.closest('.prev')
            //         const next = e.target.closest('.next')
            //         const movie = e.target.closest('.movie')
            //         const elementAnimate = next ? next.previousElementSibling : prev.nextElementSibling
            //         const { widthElement, displayQuantity } = this.getNumberDisplayOnPage(elementAnimate, screenWidth)
            //         currentPageMovie = displayQuantity + indexMovie
            //         console.log(currentPageMovie)
            //         if (prev && currentPageMovie > 0) {
            //             if (indexMovie > 0) {
            //                 indexMovie--
            //             }
            //             console.log('idex: ', indexMovie, 'currentPageMovie', currentPageMovie)
            //             elementAnimate.style.transform = `translate3d(-${indexMovie * widthElement}px, 0, 0)`
            //         }

            //         if (next && currentPageMovie < maxMovie) {
            //             if (indexMovie < maxMovie) {
            //                 indexMovie++
            //             }
            //             console.log('indexMovie: ', indexMovie, 'currentPageMovie', currentPageMovie, 'quanity', maxMovie)
            //             elementAnimate.style.transform = `translate3d(-${indexMovie * widthElement}px, 0, 0)`
            //         }

            //         if (movie) {
            //             const linkMovie = movie
            //         }
            //     })
            // })
        },
        getNumberDisplayOnPage(elementAnimate, screenWidth) {
            const element = elementAnimate.children[0]
            const computedStyle = window.getComputedStyle(element)
            const widthElement = parseFloat(computedStyle.getPropertyValue('width'))
            const percentage = (widthElement / screenWidth) * 100
            const displayQuantity = Math.round(100 / percentage)
            return { widthElement, displayQuantity }
        },
        handlePrevElement(currentPage, index, element, widthElement) {
            if (currentPage > 0) {
                if (index > 0) {
                    index--
                }
                console.log('idex: ', index, 'currentPageMovie', currentPage)
                element.style.transform = `translate3d(-${index * widthElement}px, 0, 0)`
            }
            
        },
        handleNextElement(currentPage, index, element, widthElement, maxMovie) {
            if (currentPage < maxMovie) {
                if (index < maxMovie) {
                    index++
                }
                console.log('idex: ', index, 'currentPageMovie', currentPage)
                element.style.transform = `translate3d(-${index * widthElement}px, 0, 0)`
            }
        },
        start() {
            this.fetchApi(page)
        }
    }
})()
root.start()