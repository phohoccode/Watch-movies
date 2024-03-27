const API_FEATUREFILM = `https://phimapi.com/v1/api/danh-sach/phim-le`
const API_TELEVISIONSERIES = `https://phimapi.com/v1/api/danh-sach/phim-bo`
const API_CARTOON = `https://phimapi.com/v1/api/danh-sach/hoat-hinh`
const API_TVSHOWS = `https://phimapi.com/v1/api/danh-sach/tv-shows` 

export { API_FEATUREFILM, API_TELEVISIONSERIES, API_CARTOON, API_TVSHOWS}

const fetchAPI = (API_KEY) => {
    return fetch(API_KEY)
        .then(async response => {
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(err => {
            console.error('Error: ', err);
            throw err;
        });
};

export default fetchAPI;

