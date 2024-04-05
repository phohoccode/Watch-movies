import storage from "../utils/localStorage.js"
import toastMessege from "../utils/toastMessage.js"
import fetchAPI from "../utils/fectchAPI.js"

const handleAddMovieToWatchLater = (element) => {
    let newWatchLaterMoviesList = storage.get('listMoviesToWatchLater')
    const addMovie = element.parentNode
    const linkSlug = `https://phimapi.com/phim/${addMovie.dataset.slug}`
    addMovie.classList.add('active')
    if (linkSlug) {
         fetchAPI(linkSlug)
            .then(data => {
                if (!newWatchLaterMoviesList.some(item => item.slug === data.movie.slug)) {
                    newWatchLaterMoviesList.push(data.movie)
                    storage.set('listMoviesToWatchLater', newWatchLaterMoviesList)
                    toastMessege({
                        title: 'Đã lưu phim thành công!',
                        message: `Xem ngay <a href="./listMoviesToWatchLater.html">Phim đã lưu</a>`,
                        type: 'success',
                        duration: 3000,
                    })
                }
            })
    }
}
export default handleAddMovieToWatchLater
window.handleAddMovieToWatchLater = handleAddMovieToWatchLater