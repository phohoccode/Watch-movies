import {$,$$} from "./base.js"
import storage from "../utils/localStorage.js"
import {header, handleHeader} from "../components/handleHeader.js"
import {footer, handleFeedback}  from "../components/handleFooter.js"
import componentRendering from "../utils/componentRendering.js"

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
            componentRendering('./src/components/header.html', header)
            componentRendering('./src/components/footer.html', footer)
            this.setDocumentTitleAndMovieName()
            this.renderEpisode(link_embed)
            this.setActiveMovieDefault()
            this.handleClickChangeEpisode()
            handleHeader()
            handleFeedback()
        }
    }
})()
wacthMovie.start()