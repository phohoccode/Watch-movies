import fetchAPI from "./fectchAPI.js"
import handleSetTitleAndStoreData from "./handleSetTitleAndStoreData.js"

const handleWatchNowSlide = async (element) => {
    const linkSlug = element.dataset.slug
    if (!linkSlug) {
        console.log('Error link slug')
        return
    }
    try {
        const data = await fetchAPI(linkSlug)
        handleSetTitleAndStoreData(data)
        window.location.href = './watchMovie-page.html'
    } catch (error) {
        console.log(error)
    }
}
export default handleWatchNowSlide
