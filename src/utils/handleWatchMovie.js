import storage from "../utils/localStorage.js"
import handleDetailPages from "./handleDetailPages.js"
import handleWatchNowSlide from "./handleWatchNowSlide.js"
import { $ } from "../utils/base.js"

const handleWatchMovie = () => {
    const content = $('.content')
    content.addEventListener('click', (e) => {
        const watchNow = e.target.closest('.watch-now')
        const movie = e.target.closest('.movie')
        const wacthAll = e.target.closest('.watch-all')
        if (watchNow) {
            handleWatchNowSlide(watchNow)
        }
        if (movie) {
            const linkSlug = movie.dataset.slug
            if (!linkSlug) {
                console.log('Link slug not found!')
                return
            }
            storage.set('link-slug', linkSlug)
        }
        if (wacthAll) {
            handleDetailPages(wacthAll)
        }
    })
}
export default handleWatchMovie