import { handleChangePage } from "./handleHeader.js"

const Country = (data) => {
    return data.map(country => `
        <li>
            <a 
                onclick="handleChangePage(this)"
                class="change-page" 
                data-api="https://phimapi.com/v1/api/quoc-gia/${country?.slug}"
            >
                ${country?.name}
            </a>
        </li>
    `).join('')
}
export default Country