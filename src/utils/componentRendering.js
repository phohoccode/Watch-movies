import { fectchTextHtml } from "../utils/fectchAPI.js";
const componentRendering = (url, element) => {
    fectchTextHtml(url)
        .then(data => {
            if (!data) {
                console.log('Data not found!')
                return
            }
            element.innerHTML = data
        })
        .catch(err => {
            console.log('Error', err)
        })
}
export default componentRendering