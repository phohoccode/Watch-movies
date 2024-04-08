import storage from "../utils/localStorage.js"
import toastMessage from "../utils/toastMessage.js"

const handleRemoveMovieToWatchLater = (element) => {
    const listOfMoviesToWatchLaterStorage = storage.get('listMoviesToWatchLater')
    const addMovie = element.parentNode
    const slug = addMovie.dataset.slug
    if (!addMovie && !slug) {
        console.log('Addmovie or slug not found!')
        return
    }
    addMovie.classList.remove('active')
    const listOfMoviesToWatchLaterNew = listOfMoviesToWatchLaterStorage.filter(item => item.slug !== slug)
    storage.set('listMoviesToWatchLater', listOfMoviesToWatchLaterNew)
    toastMessage({
        title: 'Đã xóa phim thành công!',
        message: `Xem ngay <a href="./listMoviesToWatchLater.html">Phim đã lưu</a>`,
        type: 'success'
    })
}
export default handleRemoveMovieToWatchLater
window.handleRemoveMovieToWatchLater = handleRemoveMovieToWatchLater
