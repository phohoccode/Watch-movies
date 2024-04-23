import storage from "../utils/localStorage.js"
import fetchAPI from "../utils/fectchAPI.js"

const handleDetailPages = async (element) => {
    try {
        const linkApi = element.dataset.api
        const data = await fetchAPI(linkApi)
        const totalPage = data?.data?.params?.pagination?.totalPages
        storage.set('link-api', linkApi)
        storage.set('total-page', totalPage)
        window.location.href = './detailMovie-page.html'
    } catch (error) {
        console.error(error)
    }
}
export default handleDetailPages