import { $, header, footer } from "../utils/base.js"
import fetchAPI from "../utils/fectchAPI.js"
import storage from "../utils/localStorage.js"
import handleHeader from "../utils/handleHeader.js"
import handleFeedback from "../utils/handleFeedback.js"
import componentRendering from "../utils/componentRendering.js"
import setTitleAndStoreData from "../utils/setTitleAndStoreData.js"
import renderHeader from "../components/renderHeader.js"
import hanleWhenDowloadingMoviesFail from "../utils/handleWhenDownloadingMoviesFails.js"
import initLoader from "../utils/initLoader.js"

const infoMovie = (() => {
    const backgroundMovie = $('.background-movie')
    const infomationMovie = $('.information-movie')
    
    return {
        async fetchApi() {
            const API_MOVIE = storage.get('link-slug')
            try {
                const movieData = await fetchAPI(API_MOVIE)
                console.log(movieData)
                if (movieData.episodes[0].server_data.length === 0) {
                    hanleWhenDowloadingMoviesFail()
                    return
                }
                setTitleAndStoreData(movieData)
                setTimeout(() => {
                    this.renderBackgroundMovie(movieData.movie, backgroundMovie)
                    this.renderInfoMovie(movieData.movie, infomationMovie)
                }, 1000)
                history.pushState(null, '', `/Watch-movies/infoMovie-page.html?/${movieData.movie.slug}`)
            } catch (error) {
                console.log(error)
                hanleWhenDowloadingMoviesFail()
            }
        },
        renderBackgroundMovie(data, element) {
            const htmls = `
                <figure>
                    <img src="${data.thumb_url}" alt="">
                </figure>
                <div class="movie-info">
                    <h3>${data.name}</h3>
                    <div class="movie-info__bottom">
                        <a class="watch-now" href="./watchMovie-page.html">
                            <i class="fa-solid fa-play"></i>
                            Xem ngay
                        </a>
                        <span class="quality">${data.quality}</span>
                        <span class="year">${data.year}</span>
                        <span class="episode_current">${data.episode_current}</span>
                    </div>
                </div>
            `
            element.innerHTML = htmls
        },
        renderInfoMovie(data, element) {
            const htmls = `
                <p class="infomation-movie__content">
                    Nội dung: <span>${data.content}</span>
                </p>
                <span class="infomation-movie__country">
                    Quốc gia: <span>${data.country[0].name}</span> 
                </span>
                <span class="infomation-movie__time">
                    Thời gian: <span>${data.time}</span> 
                </span>
                <ul class="infomation-movie__director">
                    <h4>Đạo diễn</h4>
                    ${data.director.map(name => `
                        <li>${name}</li>
                    `).join('')}
                </ul>
                <ul class="infomation-movie__actor">
                    <h4>Diễn viên</h4>
                    ${data.actor.map(name => `
                        <li>${name}</li>
                    `).join('')}
                </ul>
                <ul class="infomation-movie__category">
                    <h4>Thể loại</h4>
                    ${data.category.map(category => `
                    <li>${category.name}</li> 
                    `).join('')}
                </ul>
            `
            element.innerHTML = htmls
        },
        start() {
            renderHeader(header)
            initLoader(2000)
            this.fetchApi()
            componentRendering('./src/components/footer.html', footer)
            handleHeader()
            handleFeedback()
        }
    }
})()
infoMovie.start()