import { handleChangePage } from "./handleHeader.js"

const Category = (data) => {
    return data.map(category => `
        <li>
            <a
                onclick="handleChangePage(this)"
                class="change-page" 
                data-api="https://phimapi.com/v1/api/the-loai/${category?.slug}"
            >
                ${category?.name}
            </a>
        </li>
    `).join('')
}
export default Category
