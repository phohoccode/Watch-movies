import fetchAPI from "../../utils/fectchAPI.js"
import Category from "./Category.js"
import Country from "./Country.js"
import { handleChangePage } from "./handleHeader.js"
import { API_CATEGORY,API_COUNTRY } from "../../utils/fectchAPI.js"

const MenuHeader = async () => {
    const [categoryData, countryData] = await Promise.all([
        fetchAPI(API_CATEGORY),
        fetchAPI(API_COUNTRY)
    ])
    
    return `
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
    `
}
export default MenuHeader