import getNumberDisplayOnPage from "./getNumberDisplayOnPage.js"

const handlePrevOrNextButton = (prevButton, nextButton, indexMovie, currentPage, maxMovies, screenWidth) => {
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const elementAnimate = prevButton.nextElementSibling
            const { widthElement, displayQuantity } = getNumberDisplayOnPage(elementAnimate, screenWidth)
            currentPage = displayQuantity + indexMovie
            if (currentPage > 0) {
                if (indexMovie > 0) {
                    indexMovie--
                }
                elementAnimate.style.transform = `translate3d(-${indexMovie * widthElement}px, 0, 0)`
            }
        })
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const elementAnimate = nextButton.previousElementSibling
            const { widthElement, displayQuantity } = getNumberDisplayOnPage(elementAnimate, screenWidth)
            currentPage = displayQuantity + indexMovie
            if (currentPage < maxMovies) {
                if (indexMovie < maxMovies) {
                    indexMovie++
                }
                elementAnimate.style.transform = `translate3d(-${indexMovie * widthElement}px, 0, 0)`
            }
        })
    }
}
export default handlePrevOrNextButton