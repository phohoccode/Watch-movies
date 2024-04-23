import Movies from "../components/Content/Movies.js"
import Header from "../components/Header/Header.js"
import Footer from "../components/Footer/Footer.js"
import {$, header, footer } from "../utils/base.js"
import storage from "../utils/localStorage.js"
import initLoader from "../utils/initLoader.js"

const moviesToWatchLater = (() => {
    const listMoviesToWatchLater = $('.listMoviesToWatchLater')
    
    return {
        renderMovieToWatchLater(element) {
            let listOfMoviesToWatch = storage.get('listMoviesToWatchLater')
            const movie = `
                <header>
                    <h3 class="title-name">
                        ${listOfMoviesToWatch.length !== 0 ?
                            'Danh sách tất cả phim đã lưu' :
                            'Danh sách phim đang trống!'}
                    </h3>
                </header>
                <div class="movies">
                    ${Movies(listOfMoviesToWatch)}
                </div>
            `
            element.innerHTML = movie
        },
        handleEvent() {
            listMoviesToWatchLater.addEventListener('click', (e) => {
                const remove = e.target.closest('.icon-remove')
                if (remove) {
                    this.renderMovieToWatchLater(listMoviesToWatchLater)
                }
            })
        },
        start() {
            Header(header)
            Footer(footer)
            initLoader(2000)
            setTimeout(() => {
                this.renderMovieToWatchLater(listMoviesToWatchLater)
            }, 2000)
            this.handleEvent()
        }
    }
})()
moviesToWatchLater.start()

