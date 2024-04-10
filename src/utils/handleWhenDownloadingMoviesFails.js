import toastMessege from "./toastMessage.js"
const hanleWhenDowloadingMoviesFail = () => {
    toastMessege({
        title: 'Tải phim thất bại',
        message: 'Link phim hiện tại đang hỏng',
        type: 'error'
    })
    setTimeout(() => {
        window.location.href = './index.html'
    }, 2000)
}
export default hanleWhenDowloadingMoviesFail