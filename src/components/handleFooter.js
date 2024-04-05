import { $ } from "../js/base.js";
const footer = document.querySelector('footer')
const handleFeedback = () => {
    footer.addEventListener('click', (e) => {
        const sendMail = e.target.closest('.send-mail')
        if (sendMail) {
            const messageValue = $('form textarea').value
            if (messageValue !== '') {
                window.location.href = `mailto:qviet092@gmail.com?subject=&body=${encodeURIComponent(messageValue)}`
            } else {
                console.log('Error')
            }
        }
    })
}
export {footer, handleFeedback}