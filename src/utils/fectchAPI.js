const API_FEATUREFILM = `https://phimapi.com/v1/api/danh-sach/phim-le`
const API_TELEVISIONSERIES = `https://phimapi.com/v1/api/danh-sach/phim-bo`
const API_CARTOON = `https://phimapi.com/v1/api/danh-sach/hoat-hinh`
const API_TVSHOWS = `https://phimapi.com/v1/api/danh-sach/tv-shows`
const API_CATEGORY = `https://phimapi.com/the-loai`
const API_COUNTRY = `https://phimapi.com/quoc-gia`

const fetchAPI = (API_KEY) => {
    return fetch(API_KEY)
        .then(async response => {
            if (response.ok) {
                return await response.json()
            }
        })
        .catch(err => {
            console.error('Error: ', err)
        })
}
export default fetchAPI

const fectchTextHtml = (HTML) => {
    return fetch(HTML)
        .then(async response => {
            if (response.ok) {
                return await response.text()
            }
        })
        .catch(err => {
            console.log('Error', err)
        })
}

export {
    API_FEATUREFILM,
    API_TELEVISIONSERIES,
    API_CARTOON, API_TVSHOWS,
    API_CATEGORY, API_COUNTRY,
    fectchTextHtml
}

