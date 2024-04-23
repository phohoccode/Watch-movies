import storage from "./localStorage.js"

const handleSetTitleAndStoreData = (data) => {
    const movieName = data?.movie?.name
    const serverData = data?.episodes[0]?.server_data
    if (!movieName && !serverData) {
        console.error('Title page or movie name or sever data not found!')
        return
    }
    const link_embed = serverData.map(link => link)
    document.title = movieName
    storage.set('title-page', movieName)
    storage.set('movie-name', movieName)
    storage.set('link_embed', link_embed)
}
export default handleSetTitleAndStoreData