import { mainPage, content } from "./base.js"

const initLoader = () => {
    const loader = document.createElement('div')
    loader.className = 'loader'
    content.appendChild(loader)
    setTimeout(() => {
        if (content.contains(loader)) {
            content.removeChild(loader)
        }
    }, 2000)
}
export default initLoader