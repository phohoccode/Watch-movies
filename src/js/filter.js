import fetchAPI from "./fectchAPI.js"
const API = `https://phimapi.com/v1/api/the-loai/hanh-dong`
fetchAPI(API)
.then(data => {
    console.log(data)
})