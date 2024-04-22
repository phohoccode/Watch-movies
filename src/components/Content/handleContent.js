import storage from "../../utils/localStorage.js"
import handleDetailPages from "../../utils/handleDetailPages.js"
import handleWatchNowSlide from "../../utils/handleWatchNowSlide.js"

const handleWatchNow = (event, element) => {
    event.preventDefault()
    handleWatchNowSlide(element)
}

const handleMovie = (element) => {
    const linkSlug = element.dataset.slug
    if (!linkSlug) {
        console.log('Link slug not found!')
        return
    }
    storage.set('link-slug', linkSlug)
}

const handleWatchAll = (element) => {
    handleDetailPages(element)
}

window.handleWatchNow = handleWatchNow
window.handleMovie = handleMovie
window.handleWatchAll = handleWatchAll

export {
    handleWatchNow,
    handleMovie,
    handleWatchAll
}