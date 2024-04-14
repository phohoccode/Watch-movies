import storage from "../utils/localStorage.js"
import fetchAPI from "../utils/fectchAPI.js"

const handleDetailPages = async (element) => {
    const linkApi = element.dataset.api
    if (!linkApi) {
        console.log('Link api not found!')
        return
    }
    try {
        const data = await fetchAPI(linkApi)
        const totalPage = data.data.params.pagination.totalPages
        storage.set('link-api', linkApi)
        storage.set('total-page', totalPage)
        window.location.href = './detailMovie-page.html'
    } catch (error) {
        console.log(error)
    }
}
export default handleDetailPages