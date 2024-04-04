import { $, content, header, footer, handleClickWatchMovie, handleClickHeader, handleFeedback, renderComponent } from "./base.js";
import storage from "./localStorage.js"
import movies from "./component/movies.js"

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
            handleClickWatchMovie(content)
            handleClickHeader(header)
            handleFeedback(footer)

            listMoviesToWatchLater.addEventListener('click', (e) => {
                const remove = e.target.closest('.icon-remove')
                if (remove) {
                    this.renderMovieToWatchLater(listMoviesToWatchLater)
                }
            })
        },
        start() {
            this.renderMovieToWatchLater(listMoviesToWatchLater)
            this.handleEvent()
            renderComponent('./componentHTML/header.html', header)
            renderComponent('./componentHTML/footer.html', footer)
        }
    }
})();

moviesToWatchLater.start();

