import storage from "../utils/localStorage.js"
import setTitleAndStoreData from "../utils/setTitleAndStoreData.js"
import fetchAPI from "../utils/fectchAPI.js"
import handleDetailPages from "./handleDetailPages.js"
import { $ } from "../js/base.js"

const handleWatchNowSlide = (element) => {
    const linkSlug = element.dataset.slug
    if (linkSlug) {
        fetchAPI(linkSlug)
            .then(data => {
                setTitleAndStoreData(data)
                window.location.href = './watchMovie-page.html'
            })
            .catch(err => {
                console.log('Error', err)
            })
    } else {
        console.log('Error link slug')
    }
}

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
            if (linkSlug) {
                storage.set('link-slug', linkSlug)
            }
        }
        if (wacthAll) {
            handleDetailPages(wacthAll)
        }
    })
}
export default handleWatchMovie