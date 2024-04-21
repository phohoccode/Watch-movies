const handleEscapeHTML = html => {
    if (html.includes('<') || html.includes('>')) {
        html = html.replace(/[<>]/g, '');
        return html;
    }
    return html
}
export default handleEscapeHTML;

