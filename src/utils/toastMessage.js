const toastMessege = ({
    title = '',
    message = '',
    type = '',
    duration = 2000,
}) => {
    const toastParent = document.getElementById('toast')
    if (!toastParent) {
        const newToastParent = document.createElement('div')
        newToastParent.id = 'toast'
        document.body.appendChild(newToastParent)
        renderMessage(newToastParent, title, message, type, duration)
    } else {
        renderMessage(toastParent, title, message, type, duration)
    }
}

const renderMessage = (element, title, message, type, duration) => {
    const toastChild = document.createElement('div')
    const autoRemoveToast = setTimeout(() => {
        element.removeChild(toastChild)
    }, duration + 1000)

    const icons = {
        success: `fa-regular fa-check fa-bounce`,
        error: `fa-regular fa-exclamation fa-bounce`,
        welcome: `fa-light fa-hands-clapping fa-bounce`
    }
    const icon = icons[type]
    const delay = (duration / 1000).toFixed(2)

    toastChild.classList.add('toast', `toast--${type}`)
    toastChild.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`

    toastChild.innerHTML = `
        <div class="toast__icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title">${title}</h3>
            <p class="toast__message toast--${type}">${message}</p>
        </div>
        <div class="toast__close">
            <i class="fa-regular fa-xmark"></i>
        </div>
    `
    toastChild.addEventListener('click', (e) => {
        const closeNode = e.target.closest('.toast__close')
        if (closeNode) {
            element.removeChild(toastChild)
            clearTimeout(autoRemoveToast)
        }
    })
    if (!element.contains(toastChild)) {
        element.appendChild(toastChild)
    }
}
export default toastMessege