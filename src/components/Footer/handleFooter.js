import toastMessage from '../../utils/toastMessage.js'

const handleFeedback = (event, element) => {
    event.preventDefault()
    if (element.value === '') {
        toastMessage({
            title: 'Gửi thất bại!',
            message: 'Vui lòng nhập lời nhắn',
            type: 'error',
        })
        return
    }
    const subject = encodeURIComponent('Xin chào tôi đến từ PHOFLIX!')
    const body = encodeURIComponent(element.value)
    window.location.href = `mailto:qviet092@gmail.com?subject=${subject}&body=${body}`
}

window.handleFeedback = handleFeedback
export default handleFeedback
