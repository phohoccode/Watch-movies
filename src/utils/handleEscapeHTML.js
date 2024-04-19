const handleEscapeHTML = html => {
    return html.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
export default handleEscapeHTML
