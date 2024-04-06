const category = (data) => {
    return data.map(category => `
        <li>
            <a class="change-page" data-api="https://phimapi.com/v1/api/the-loai/${category.slug}">${category.name}</a>
        </li>
    `).join('')
}
export default category
