import storage from "../utils/localStorage.js"
import fetchAPI from "../utils/fectchAPI.js"

const handleDetailPages = (element) => {
    const linkApi = element.dataset.api
    if (!linkApi) {
        console.log('Link api not found!')
        return
    }
    fetchAPI(linkApi)
        .then(data => {
            const totalPage = data.data.params.pagination.totalPages
            if (!totalPage) {
                console.log('Total page not found!')
                return 
            }
            storage.set('link-api', linkApi)
            storage.set('total-page', totalPage)
            window.location.href = './detailMovie-page.html'
        })
        .catch(err => {
            console.log('Error', err)
        })
}
export default handleDetailPages