import { $, $$, handleClickButtonSearch, handleClickChangePage } from "./base.js"

const wacthMovie = (() => {
    const iframe = $('iframe')
    const episodes = $('.episode-list')
    const link_embed = JSON.parse(localStorage.getItem('link_embed'))

    console.log(link_embed)
    console.log(link_embed[0])

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
                    const index = episode.dataset.index
                    console.log(url, index)
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
        start() {
            const valueNameMovie = JSON.parse(localStorage.getItem('movie-name'))
            const titlePage = JSON.parse(localStorage.getItem('title-page'))
            document.title = `Đang xem phim ${titlePage}`
            const nameMovie = $('.name-movie').innerText = valueNameMovie
            this.renderEpisode(link_embed)
            handleClickButtonSearch()
            handleClickChangePage()
            this.setActiveMovieDefault()
            this.handleClickChangeEpisode()
        }
    }
})()
wacthMovie.start()