import toastMessege from "./toastMessage.js"
const hanleWhenDowloadingMoviesFail = () => {
    toastMessege({
        title: 'Tải phim thất bại!',
        message: 'Xin lỗi, có sự cố xảy ra khi tải phim :((',
        type: 'error',
        duration: 1500
    })
    setTimeout(() => {
        window.location.href = './index.html'
    }, 2000)
}
export default hanleWhenDowloadingMoviesFail