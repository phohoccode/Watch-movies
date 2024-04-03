import { $,$$, content,header, footer, handleClickWatchMovie,handleClickHeader,handleFeedback, renderComponent, handleClickAddMovie, handleClickRemoveMovie } from "./base.js";
import movies from "./component/movies.js";
import storage from "./localStorage.js"

const moviesToWatchLater = (() => {
    const listMoviesToWatchLater = $('.listMoviesToWatchLater')
    let listMovies = storage.get('listMoviesToWatchLater')
    return {
        renderMovie(data) {
            const movie = `
                <header>
                    <div class="title-name">Danh sách tất cả phim đã lưu</div>
                </header>
                <div class="movies">
                    ${movies(data)}
                </div>
            `
            listMoviesToWatchLater.innerHTML = movie
        },
        handleEvent() {
            handleClickWatchMovie(content)
            handleClickHeader(header)
            handleFeedback(footer)
        },
        start() {         
            this.renderMovie(listMovies)
            this.handleEvent()
            renderComponent('./componentHTML/header.html', header)
            renderComponent('./componentHTML/footer.html', footer)
        }
    }
})()
moviesToWatchLater.start()