import { fectchTextHtml } from "../utils/fectchAPI.js";
const componentRendering = async (url, element) => {
    try {
        const data = await fectchTextHtml(url)
        element.innerHTML = data
    } catch (error) {
        console.log(error)
    }
}
export default componentRendering