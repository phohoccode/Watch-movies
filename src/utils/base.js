const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const mainPage = $('.main-page')
const content = $('.content')
const header = $('.main-page > header')
const footer = $('footer')
window.$ = $
window.$$ = $
export {
    $, $$,
    content,
    header,
    footer,
    mainPage
}
