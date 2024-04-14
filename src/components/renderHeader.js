import fetchAPI from "../utils/fectchAPI.js"
import { API_CATEGORY, API_COUNTRY } from "../utils/fectchAPI.js"
import category from "./category.js"
import country from "./country.js"

const header = async (element) => {
    const [categoryData, countryData] = await Promise.all([
        fetchAPI(API_CATEGORY),
        fetchAPI(API_COUNTRY)
    ])

    const htmls = `
        <div class="bars">
            <i class="fa-light fa-bars-staggered"></i>
        </div>
        <div class="logo">
            <a href="./index.html">PHOFLIX</a>
        </div>
        <div class="menu-header">
            <div class="close">
                <i class="fa-thin fa-square-xmark"></i>
            </div>
            <div class="menu-header__item">
                <a href="./index.html">
                    Trang chủ
                </a>
            </div>
            <div class="menu-header__item">
                <a class="change-page" data-api="https://phimapi.com/v1/api/danh-sach/phim-le"> 
                    Phim lẻ
                </a>
            </div>
            <div class="menu-header__item">
                <a class="change-page" data-api="https://phimapi.com/v1/api/danh-sach/phim-bo">
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
                    ${category(categoryData)}   
                </ul>
            </div>
            <div class="menu-header__item">
                <a>Quốc gia
                    <i class="fa-regular fa-chevron-down"></i>
                </a>
                <ul class="item__list">
                    ${country(countryData)}   
                </ul>
            </div>    
        </div>
        <div class="search">
            <input type="text" placeholder="Tìm kiếm...">
            <button class="search-btn">
                <i class="fa-light fa-magnifying-glass"></i>
            </button>
            <button class="reset-value">
                <i class="fa-light fa-xmark"></i>
            </button>
        </div>
    `
    element.innerHTML = htmls
}

export default header
