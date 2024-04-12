const getNumberDisplayOnPage = (elementAnimate, screenWidth) => {
    const element = elementAnimate.children[0]
    const computedStyle = window.getComputedStyle(element)
    const widthElement = parseFloat(computedStyle.getPropertyValue('width'))
    const percentage = (widthElement / screenWidth) * 100
    const displayQuantity = Math.round(100 / percentage)
    return { widthElement, displayQuantity }
}
export default getNumberDisplayOnPage