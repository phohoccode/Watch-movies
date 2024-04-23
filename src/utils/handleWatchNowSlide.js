import fetchAPI from "./fectchAPI.js"
import handleSetTitleAndStoreData from "./handleSetTitleAndStoreData.js"

const handleWatchNowSlide = async (element) => {
    try {
        const linkSlug = element.dataset.slug
        const data = await fetchAPI(linkSlug)
        handleSetTitleAndStoreData(data)
        window.location.href = './watchMovie-page.html'
    } catch (error) {
        console.error(error)
    }
}
export default handleWatchNowSlide
