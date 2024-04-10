import storage from "../utils/localStorage.js"
import {$,$$, header, footer } from "../utils/base.js"
import handleHeader from "../utils/handleHeader.js"
import handleFeedback from "../utils/handleFeedback.js"
import componentRendering from "../utils/componentRendering.js"
import renderHeader from "../components/renderHeader.js"
import toastMessege from "../utils/toastMessage.js"

const wacthMovie = (() => {
    const detailMovie = $('.detail-movie')
    const link_embed = storage.get('link_embed')
    const curentMovie = storage.get('current-movie')
    const movieName = storage.get('movie-name')
    return {
        renderMovie(data) {
            const htmls = `
                <h3 class="name-movie">${movieName}</h3>
                <div class="view-iframe">
                    <iframe src="" frameborder="0" class="video" allow="fullscreen"></iframe>
                </div>
                <div class="episode-list">
                    ${data.map((episode, index) => `
                    <div class="episode" 
                        data-index="${index}" 
                        data-linkEmbed="${episode.link_embed}">
                        ${episode.name}
                     </div>
                    `).join('')}
                </div>
            `
            detailMovie.innerHTML = htmls
        },
        handleClickChangeEpisode() {
            const episodes = $('.episode-list')
            episodes.addEventListener('click', (e) => {
                const episode = e.target.closest('.episode')
                if (episode) {
                    const url = episode.dataset.linkembed
                    const index = episode.dataset.index
                    this.setActiveMovie(episode, url, index)
                }
            })
        },
        setActiveMovie(element, url, index) {
            const iframe = $('iframe')
            const curentMovie = {
                url,
                index
            }
            $('.episode.active').classList.remove('active')
            element.classList.add('active')
            iframe.setAttribute('src', url)
            storage.set('current-movie', curentMovie)
        },
        setActiveMovieDefault() {
            const iframe = $('iframe')
            if (link_embed.find(link => link.link_embed === curentMovie.url)) {
                $$('.episode')[curentMovie.index].classList.add('active')
                iframe.setAttribute('src', curentMovie.url)
                setTimeout(() => {
                    toastMessege({
                        title: 'Chào mừng bạn đã quay lại!',
                        message: `Trước đó bạn đang xem tập ${Number(curentMovie.index) + 1}`,
                        type: 'welcome'
                    })
                }, 1000)
            } else {
                $$('.episode')[0].classList.add('active')
                iframe.setAttribute('src', link_embed[0].link_embed)
            }
        },
        setDocumentTitle() {
            const titlePage = storage.get('title-page')
            document.title = `Bạn đang xem ${titlePage}`
        },
        start() {
            renderHeader(header)
            componentRendering('./src/components/footer.html', footer)
            this.setDocumentTitle()
            this.renderMovie(link_embed)
            this.setActiveMovieDefault()
            this.handleClickChangeEpisode()
            handleHeader()
            handleFeedback()
        }
    }
})()
wacthMovie.start()