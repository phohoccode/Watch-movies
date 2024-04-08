import storage from "../utils/localStorage.js"
import toastMessege from "../utils/toastMessage.js"
import fetchAPI from "../utils/fectchAPI.js"

const handleAddMovieToWatchLater = (element) => {
    const newWatchLaterMoviesList = storage.get('listMoviesToWatchLater')
    const addMovie = element.parentNode
    const linkSlug = `https://phimapi.com/phim/${addMovie.dataset.slug}`
    
    if (!linkSlug && !addMovie) {
        console.log('Link slug or addMovie not found!')
        return
    }
    addMovie.classList.add('active')
    fetchAPI(linkSlug)
        .then(data => {
            if (!newWatchLaterMoviesList.find(item => item.slug === data.movie.slug)) {
                newWatchLaterMoviesList.push(data.movie)
                storage.set('listMoviesToWatchLater', newWatchLaterMoviesList)
                toastMessege({
                    title: 'Đã  lưu phim thành công!',
                    message: `Xem ngay <a href="./listMoviesToWatchLater.html">Phim đã lưu</a>`,
                    type: 'success',
                    duration: 3000,
                })
            }
        })
        .catch(err => {
            console.log('Error', err)
        })
}
export default handleAddMovieToWatchLater
window.handleAddMovieToWatchLater = handleAddMovieToWatchLater