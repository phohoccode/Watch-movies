import storage from "../utils/localStorage.js"

const setTitleAndStoreData = (data) => {
    const link_embed = []
    const titlePage = data.episodes[0].server_data[0].filename
    if (titlePage) {
        document.title = titlePage
    }
    data.episodes[0].server_data.forEach(link => link_embed.push(link))
    storage.set('title-page', titlePage)
    storage.set('link_embed', link_embed)
    storage.set('movie-name', data.movie.name)
}
export default setTitleAndStoreData