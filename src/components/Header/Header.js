import { $ } from "../../utils/base.js"
import fetchAPI from "../../utils/fectchAPI.js"
import Category from "./Category.js"
import Country from "./Country.js"
import { 
    API_CATEGORY, 
    API_COUNTRY 
} from "../../utils/fectchAPI.js"
import {
    handleButtonBars,
    handleButtonClose,
    handleButtonSearch,
    handleChangePage,
    handleInputSearch,
    handleResetValue
} from "./handleHeader.js"

const Header = async (element) => {
    const [categoryData, countryData] = await Promise.all([
        fetchAPI(API_CATEGORY),
        fetchAPI(API_COUNTRY)
    ])

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
            <div
                onclick="handleButtonClose($('.menu-header'))" 
                class="close"
            >
                <i class="fa-thin fa-square-xmark"></i>
            </div>
            <div class="menu-header__item">
                <a href="./index.html">
                    Trang chủ
                </a>
            </div>
            <div class="menu-header__item">
                <a 
                    onclick="handleChangePage(this)"
                    class="change-page"
                    data-api="https://phimapi.com/v1/api/danh-sach/phim-le"
                > 
                    Phim lẻ
                </a>
            </div>
            <div class="menu-header__item">
                <a 
                    onclick="handleChangePage(this)"
                    class="change-page"
                    data-api="https://phimapi.com/v1/api/danh-sach/phim-bo"
                >
                    Phim bộ
                </a>
            </div>
            <div class="menu-header__item">
                <a href="./listMoviesToWatchLater.html">
                    Phim đã lưu
                </a>
            </div>
            <div class="menu-header__item">
                <a>Thể loại
                    <i class="fa-regular fa-chevron-down"></i>
                </a>
                <ul class="item__list">
                    ${Category(categoryData)}   
                </ul>
            </div>
            <div class="menu-header__item">
                <a>Quốc gia
                    <i class="fa-regular fa-chevron-down"></i>
                </a>
                <ul class="item__list">
                    ${Country(countryData)}   
                </ul>
            </div>    
        </div>
        <div class="search">
            <input
                onkeydown="handleInputSearch(event)"
                type="text" placeholder="Tìm kiếm...">
            <button
                onclick="handleButtonSearch($('.search input'))"
                class="search-btn"
            >
                <i class="fa-light fa-magnifying-glass"></i>
            </button>
            <button
                onclick="handleResetValue($('.search input'))"
                class="reset-value"
            >
                <i class="fa-light fa-xmark"></i>
            </button>
        </div>
    `
    element.innerHTML = htmls
}
export default Header
