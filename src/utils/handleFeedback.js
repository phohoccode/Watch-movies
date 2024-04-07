import { $, footer } from "../utils/base.js"

const handleFeedback = () => {
    footer.addEventListener('click', (e) => {
        const sendMail = e.target.closest('.send-mail')
        if (sendMail) {
            e.preventDefault()
            const messageValue = $('form textarea').value
            if (messageValue === '') {
                console.log('Nội dung đang trống!')
                return
            }
            window.location.href = `mailto:qviet092@gmail.com?subject=&body=${encodeURIComponent(messageValue)}`
        }
    })
}
export default handleFeedback