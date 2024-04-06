const country = (data) => {
    return data.map(country => `
        <li>
            <a class="change-page" data-api="https://phimapi.com/v1/api/quoc-gia/${country.slug}">${country.name}</a>
        </li>
    `).join('')
}
export default country