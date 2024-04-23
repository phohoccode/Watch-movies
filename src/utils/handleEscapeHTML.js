const handleEscapeHTML = value => {
    if (/[<>]/.test(value)) {
        return value.replace(/[<>]/g, '');
    }
    return value;
}
export default handleEscapeHTML;


