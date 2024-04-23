import { $ } from "../../utils/base.js"
import { handleButtonBars, handleButtonClose } from "./handleHeader.js"
import MenuHeader from "./MenuHeader.js"
import Search from "./Search.js"

const Header = async (element) => {
    const menuHeaderHtml = await MenuHeader()

    const htmls = `
        <div 
            onclick="handleButtonBars($('.menu-header'))" 
            class="bars"
        >
            <i class="fa-light fa-bars-staggered"></i>
        </div>
        <div class="logo">
            <a href="./index.html">PHOFLIX</a>
        </div>
        <div class="menu-header">
            ${menuHeaderHtml}
        </div>
        <div class="search">
            ${Search()}
        </div>
    `
    element.innerHTML = htmls
}
export default Header
