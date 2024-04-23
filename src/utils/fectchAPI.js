export const API_FEATUREFILM = `https://phimapi.com/v1/api/danh-sach/phim-le`
export const API_TELEVISIONSERIES = `https://phimapi.com/v1/api/danh-sach/phim-bo`
export const API_CARTOON = `https://phimapi.com/v1/api/danh-sach/hoat-hinh`
export const API_TVSHOWS = `https://phimapi.com/v1/api/danh-sach/tv-shows`
export const API_CATEGORY = `https://phimapi.com/the-loai`
export const API_COUNTRY = `https://phimapi.com/quoc-gia`

const fetchAPI = async (API_KEY) => {
    try {
        const response = await fetch(API_KEY)
        return await response.json()
    } catch (error) {
        console.log('Error', error)
    }   
}
export default fetchAPI

