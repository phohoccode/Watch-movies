import storage from "../../utils/localStorage.js"
import toastMessege from "../../utils/toastMessage.js"
import fetchAPI from "../../utils/fectchAPI.js"

const handleAddMovieToWatchLater = async (element) => {
    try {
        const newWatchLaterMoviesList = storage.get('listMoviesToWatchLater')
        const addMovie = element.parentNode
        const linkSlug = `https://phimapi.com/phim/${addMovie.dataset.slug}`
        addMovie.classList.add('active')
        const data = await fetchAPI(linkSlug)
        if (!newWatchLaterMoviesList.find(item => item.slug === data.movie.slug)) {
            newWatchLaterMoviesList.push(data.movie)
            storage.set('listMoviesToWatchLater', newWatchLaterMoviesList)
            toastMessege({
                title: 'Đã lưu phim thành công!',
                message: `Xem ngay <a href="./listMoviesToWatchLater.html">Phim đã lưu</a>`,
                type: 'success',
                duration: 3000,
            })
        }
    } catch (error) {
        console.error(error)
    }
}
window.handleAddMovieToWatchLater = handleAddMovieToWatchLater
export default handleAddMovieToWatchLater