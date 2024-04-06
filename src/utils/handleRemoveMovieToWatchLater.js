import storage from "../utils/localStorage.js"

const handleRemoveMovieToWatchLater = (element) => {
    const listOfMoviesToWatchLaterStorage = storage.get('listMoviesToWatchLater')
    const addMovie = element.parentNode
    if (addMovie) {
        const slug = addMovie.dataset.slug
        if (slug) {
            let listOfMoviesToWatchLaterNew = listOfMoviesToWatchLaterStorage.filter(item => item.slug !== slug)
            storage.set('listMoviesToWatchLater', listOfMoviesToWatchLaterNew)
        }
        addMovie.classList.remove('active')
    }
}
export default handleRemoveMovieToWatchLater
window.handleRemoveMovieToWatchLater = handleRemoveMovieToWatchLater
