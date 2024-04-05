import movies from "../components/movies.js"
import {header, handleHeader} from "../components/handleHeader.js"
import {footer, handleFeedback}  from "../components/handleFooter.js"
import handleWatchMovie from "../utils/handleWatchMovie.js"
import componentRendering from "../utils/componentRendering.js"
import storage from "../utils/localStorage.js"
import handleAddMovieToWatchLater from "../utils/handleAddMovieToWatchLater.js"
import handleRemoveMovieToWatchLater from "../utils/handleRemoveMovieToWatchLater.js"

const moviesToWatchLater = (() => {
    const listMoviesToWatchLater = document.querySelector('.listMoviesToWatchLater')
    return {
        renderMovieToWatchLater(element) {
            let listOfMoviesToWatch = storage.get('listMoviesToWatchLater')
            const movie = `
                <header>
                    <div class="title-name">Danh sách tất cả phim đã lưu</div>
                </header>
                <div class="movies">
                    ${movies(listOfMoviesToWatch)}
                </div>
            `
            element.innerHTML = movie
        },
        handleEvent() {
            handleHeader()
            handleWatchMovie()
            handleFeedback()

            listMoviesToWatchLater.addEventListener('click', (e) => {
                const remove = e.target.closest('.icon-remove')
                if (remove) {
                    this.renderMovieToWatchLater(listMoviesToWatchLater)
                }
            })
        },
        start() {
            componentRendering('./src/components/header.html', header)
            componentRendering('./src/components/footer.html', footer)
            this.renderMovieToWatchLater(listMoviesToWatchLater)
            this.handleEvent()
        }
    }
})();

moviesToWatchLater.start();

