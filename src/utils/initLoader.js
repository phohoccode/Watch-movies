import { content } from "./base.js"

const initLoader = (time) => {
    const loader = document.createElement('div')
    loader.className = 'loader'
    content.appendChild(loader)
    setTimeout(() => {
        if (content.contains(loader)) {
            content.removeChild(loader)
        }
    }, time)
}
export default initLoader