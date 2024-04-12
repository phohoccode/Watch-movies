import fetchAPI from "./fectchAPI.js"
import setTitleAndStoreData from "./setTitleAndStoreData.js"

const handleWatchNowSlide = (element) => {
    const linkSlug = element.dataset.slug
    if (!linkSlug) {
        console.log('Error link slug')
        return
    }
    fetchAPI(linkSlug)
        .then(data => {  
            setTitleAndStoreData(data)
            window.location.href = './watchMovie-page.html'
        })
        .catch(err => {
            console.log('Error', err)
        })
}
export default handleWatchNowSlide
