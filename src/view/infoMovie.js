import { $, header, footer } from "../utils/base.js"
import fetchAPI from "../utils/fectchAPI.js"
import storage from "../utils/localStorage.js"
import handleHeader from "../utils/handleHeader.js"
import handleFeedback from "../utils/handleFeedback.js"
import componentRendering from "../utils/componentRendering.js"
import setTitleAndStoreData from "../utils/setTitleAndStoreData.js"
import renderHeader from "../components/renderHeader.js"
import toastMessege from "../utils/toastMessage.js"
import hanleWhenDowloadingMoviesFail from "../utils/handleWhenDownloadingMoviesFails.js"

const infoMovie = (() => {
    const backgroundMovie = $('.background-movie')
    const infomationMovie = $('.information-movie')
    
    return {
        fetchApi() {
            const API_MOVIE = storage.get('link-slug')
            fetchAPI(API_MOVIE)
                .then(data => {
                    console.log(data)
                    if (data.status === false || data.episodes[0].server_data.length === 0) {
                        hanleWhenDowloadingMoviesFail()
                        return
                    }
                    setTitleAndStoreData(data)
                    this.renderBackgroundMovie(data.movie, backgroundMovie)
                    this.renderInfoMovie(data.movie, infomationMovie)
                })
                .catch(err => {
                    console.log('Error', err)
                })
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
                <p class="infomation-movie__content">${data.content}</p>
                <span class="infomation-movie__country">Quốc gia: ${data.country[0].name}</span>
                <span class="infomation-movie__time">Thời gian: ${data.time}</span>
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
            this.fetchApi()
            renderHeader(header)
            componentRendering('./src/components/footer.html', footer)
            handleHeader()
            handleFeedback()
        }
    }
})()
infoMovie.start()