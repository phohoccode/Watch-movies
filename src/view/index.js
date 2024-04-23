import { API_FEATUREFILM, API_CARTOON, API_TVSHOWS, API_TELEVISIONSERIES } from "../utils/fectchAPI.js"
import { $, content, header, footer } from "../utils/base.js"
import fetchAPI from "../utils/fectchAPI.js"
import initLoader from "../utils/initLoader.js"
import toastMessege from "../utils/toastMessage.js"
import handlePrevOrNextButton from "../utils/handlePrevOrNextButton.js"
import Header from "../components/Header/Header.js"
import Slides from "../components/Content/Slides.js"
import Movies from "../components/Content/Movies.js"
import Footer from "../components/Footer/Footer.js"

const root = (() => {
    let page = 1
    const sliderContainer = $('.slider-container')
    const featureFilm = $('.feature-film')
    const televisonSeris = $('.television-seris ')
    const cartoon = $('.cartoon')
    const tvShows = $('.tv-shows')

    return {
        async fetchApi(currentPage) {
            const API_ALLMOVIE = `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${currentPage}`
            try {
                const [allMovieData,
                    featureFilmData,
                    televisionSeriesData,
                    cartoonData,
                    tvShowsData] = await Promise.all([
                        fetchAPI(API_ALLMOVIE),
                        fetchAPI(API_FEATUREFILM),
                        fetchAPI(API_TELEVISIONSERIES),
                        fetchAPI(API_CARTOON),
                        fetchAPI(API_TVSHOWS)
                    ])
                setTimeout(() => {
                    this.renderSlider(allMovieData.items, sliderContainer)
                    this.renderMovie(featureFilmData.data, featureFilm, API_FEATUREFILM)
                    this.renderMovie(televisionSeriesData.data, televisonSeris, API_TELEVISIONSERIES)
                    this.renderMovie(cartoonData.data, cartoon, API_CARTOON)
                    this.renderMovie(tvShowsData.data, tvShows, API_TVSHOWS)
                    this.handleEvent()
                }, 1000)
            } catch (error) {
                console.error(error)
            }
        },
        renderSlider(data, element) {
            const htmls = `
                <button class="prev">
                    <i class="fa-light fa-angle-left"></i>
                </button>
                <div class="slider-inner">
                    ${Slides(data)}
                </div>
                <button class="next">
                    <i class="fa-light fa-angle-right"></i>
                </button>
            `
            element.innerHTML = htmls
        },
        renderMovie(data, element, api) {
            const htmls = `
                    <header>
                        <h3 class="title-name">${data.titlePage}</h3>
                        <a 
                            onclick="handleWatchAll(this)"
                            class="watch-all" 
                            data-api="${api}"
                        >
                            Xem tất cả
                            <i class="fa-light fa-chevron-right"></i>
                        </a>
                    </header>
                    <div class="movie-container">
                        <button class="prev">
                            <i class="fa-light fa-angle-left"></i>
                        </button>
                        <div class="movie-inner">
                            ${Movies(data.items)}
                        </div>
                        <button class="next">
                            <i class="fa-light fa-angle-right"></i>
                        </button>
                    </div>`
            element.innerHTML = htmls
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

            handlePrevOrNextButton(
                $('.slider-container .prev'),
                $('.slider-container .next'),
                indexSlider,
                currentPageSlide,
                maxMovies,
                screenWidth
            )

            handlePrevOrNextButton(
                $('.feature-film .movie-container .prev'),
                $('.feature-film .movie-container .next'),
                indexMovieFeatureFilm,
                cuurentPageFeatureFilm,
                maxMovies,
                screenWidth
            )

            handlePrevOrNextButton(
                $('.television-seris .movie-container .prev'),
                $('.television-seris .movie-container .next'),
                indexMovieTelevisionSeri,
                cuurentPageTelevionSeri,
                maxMovies,
                screenWidth
            )

            handlePrevOrNextButton(
                $('.cartoon .movie-container .prev'),
                $('.cartoon .movie-container .next'),
                indexMovieCartoon,
                currentPageCartoon,
                maxMovies,
                screenWidth
            )

            handlePrevOrNextButton(
                $('.tv-shows .movie-container .prev'),
                $('.tv-shows .movie-container .next'),
                indexMovieTvShows,
                currentPageTvShows,
                maxMovies,
                screenWidth
            )
        },
        start() {
            Header(header)
            Footer(footer)
            initLoader(2000)
            this.fetchApi(page)
            history.pushState(null, '', `/Watch-movies/index.html?Trang-chủ`)
            setTimeout(() => {
                toastMessege({
                    title: 'Chào mừng đến với PHOFLIX!',
                    message: 'Chúc bạn có trải nghiệm xem phim vui vẻ ^^',
                    type: 'welcome',
                    duration: 3000
                })
            }, 2000)
        }
    }
})()
root.start()