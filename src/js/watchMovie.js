import { $, $$, header, footer, handleClickHeader,renderComponent, handleFeedback } from "./base.js"
import storage from "./localStorage.js"

const wacthMovie = (() => {
    const iframe = $('iframe')
    const episodes = $('.episode-list')
    const link_embed = storage.get('link_embed')

    return {
        renderEpisode(data) {
            const htmls = data.map((episode, index) => `
                <div class="episode" data-index="${index}" data-linkEmbed="${episode.link_embed}">Tập ${++index}</div>
            `).join('')
            episodes.innerHTML = htmls
        },
        handleClickChangeEpisode() {
            episodes.addEventListener('click', (e) => {
                const episode = e.target.closest('.episode')
                if (episode) {
                    const url = episode.dataset.linkembed
                    this.setActiveMovie(episode, url)
                }
            })
        },
        setActiveMovie(element, url) {
            $('.episode.active').classList.remove('active')
            element.classList.add('active')
            iframe.setAttribute('src', url)
        },
        setActiveMovieDefault() {
            $$('.episode')[0].classList.add('active')
            iframe.setAttribute('src', link_embed[0].link_embed)
        },
        setDocumentTitleAndMovieName() {
            const valueNameMovie = storage.get('movie-name')
            const titlePage = storage.get('title-page')
            document.title = `Bạn đang xem ${titlePage}`
            $('.name-movie').innerText = valueNameMovie
        },
        start() {
            renderComponent('./componentHTML/header.html', header)
            renderComponent('./componentHTML/footer.html', footer)
            this.setDocumentTitleAndMovieName()
            this.renderEpisode(link_embed)
            this.setActiveMovieDefault()
            this.handleClickChangeEpisode()
            handleClickHeader(header)
            handleFeedback(footer)
        }
    }
})()
wacthMovie.start()