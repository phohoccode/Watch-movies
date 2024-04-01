import { searchButton, changePages, sendMail, handleClickButtonSearch, handleClickChangePage, handleFeedback } from "./base.js"
import fetchAPI from "./fectchAPI.js"
import storage from "./localStorage.js"

const infoMovie = (() => {
    const backgroundMovie = document.querySelector('.background-movie')
    const infomationMovie = document.querySelector('.information-movie')
    
    return {
        fetchApi() {
            const API_MOVIE = storage.get('link-slug')

            fetchAPI(API_MOVIE)
                .then(data => {
                    console.log(data)
                    if (data.status === false) {
                        alert(`Link phim hiện tại đang hỏng :((`)
                        return
                    }
                    const link_embed = []
                    const titlePage = data.episodes[0].server_data[0].filename
                    document.title = titlePage
                    data.episodes[0].server_data.forEach(link => link_embed.push(link))
                    storage.set('title-page', titlePage)
                    storage.set('link_embed', link_embed)
                    storage.set('movie-name', data.movie.name)
                    this.renderBackgroundMovie(data.movie, backgroundMovie)
                    this.renderInfoMovie(data.movie, infomationMovie)
                })
        },
        renderBackgroundMovie(data, element) {
            const htmls = `
                <figure>
                    <img src="${data.thumb_url}" alt="">
                </figure>

                <div class="background-movie__info">
                    <h3>${data.name}</h3>
                    <div class="info-bottom">
                        <a href="./watchMovie-page.html">
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
            handleClickButtonSearch(searchButton)
            handleClickChangePage(changePages)
            handleFeedback(sendMail)
        }
    }
})()
infoMovie.start()