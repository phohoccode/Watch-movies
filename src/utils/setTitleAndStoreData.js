import storage from "../utils/localStorage.js"

const setTitleAndStoreData = (data) => {
    const titlePage = data.episodes[0].server_data[0].filename
    const movieName = data.movie.name
    const serverData = data.episodes[0].server_data
    if (!titlePage && !movieName && !serverData) {
        console.log('Title page or movie name or sever data not found!')
        return
    }
    const link_embed = serverData.map(link => link)
    document.title = titlePage
    storage.set('title-page', titlePage)
    storage.set('link_embed', link_embed)
    storage.set('movie-name', movieName)
}
export default setTitleAndStoreData