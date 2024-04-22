import Movies from "../components/Content/Movies.js"
import { header, footer } from "../utils/base.js"
import Header from "../components/Header/Header.js"
import handleFeedback from "../utils/handleFeedback.js"
import componentRendering from "../utils/componentRendering.js"
import storage from "../utils/localStorage.js"
import initLoader from "../utils/initLoader.js"

const moviesToWatchLater = (() => {
    const listMoviesToWatchLater = document.querySelector('.listMoviesToWatchLater')
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
            handleFeedback()
            listMoviesToWatchLater.addEventListener('click', (e) => {
                const remove = e.target.closest('.icon-remove')
                if (remove) {
                    this.renderMovieToWatchLater(listMoviesToWatchLater)
                }
            })
        },
        start() {
            Header(header)
            initLoader(2000)
            componentRendering('./src/components/footer.html', footer)
            setTimeout(() => {
                this.renderMovieToWatchLater(listMoviesToWatchLater)
            }, 2000)
            this.handleEvent()
        }
    }
})();

moviesToWatchLater.start();

