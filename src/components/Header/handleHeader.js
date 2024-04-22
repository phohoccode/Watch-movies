import handleEscapeHTML from "../../utils/handleEscapeHTML.js"
import handleDetailPages from "../../utils/handleDetailPages.js"
import storage from "../../utils/localStorage.js"

const handleSetValueInput = (value) => {
    if (value !== '') {
        storage.set('value-search', value) 
        window.location.href = './search-page.html'
    }
}

const handleButtonBars = (element) => {
    element.classList.add('active')
}

const handleButtonClose = (element) => {
    element.classList.remove('active')
}

const handleResetValue = (element) => {
    element.value = ''
}

const handleButtonSearch = (element) => {
    handleSetValueInput(handleEscapeHTML(element.value))    
}

const handleInputSearch = (event) => {
    if (event.key === 'Enter') {
        handleSetValueInput(handleEscapeHTML(event.target.value))
    }
}

const handleChangePage = (element) => {
    handleDetailPages(element)
}

window.handleButtonBars = handleButtonBars
window.handleButtonClose = handleButtonClose
window.handleButtonSearch = handleButtonSearch
window.handleInputSearch = handleInputSearch
window.handleResetValue = handleResetValue
window.handleChangePage = handleChangePage

export {
    handleButtonBars,
    handleButtonClose,
    handleButtonSearch,
    handleChangePage,
    handleInputSearch,
    handleResetValue
}
