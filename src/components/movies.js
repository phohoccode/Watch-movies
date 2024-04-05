const listOfMoviesToWatchLaterStorage = JSON.parse(localStorage.getItem('listMoviesToWatchLater')) || []

const renderButton = (movie) => {
    const isMovieSaved = listOfMoviesToWatchLaterStorage.some(item => item.slug === movie.slug)
    const title = isMovieSaved ? 'Xóa khỏi danh sách phim đã lưu' : 'Lưu phim vào danh sách phim đã lưu'
    const activeClass = isMovieSaved ? 'active' : ''

    return `
        <button 
            data-slug="${movie.slug}"
            title="${title}"
            class="add-movie ${activeClass}">
                <i onclick="handleAddMovieToWatchLater(this)" class="icon-add fa-light fa-plus"></i>
                <i onclick="handleRemoveMovieToWatchLater(this)" class="icon-remove fa-light fa-minus"></i>
        </button>
    `
}

const movies = (data) => {
    return data.map(movie => `
        <div class="movie" data-slug="https://phimapi.com/phim/${movie.slug}">
            <figure>
                <a href="./infoMovie-page.html">
                <img src="${movie.poster_url.includes('https://img.phimapi.com') ? 
                            movie.poster_url : 
                            'https://img.phimapi.com/' + movie.poster_url}" alt="">
                    <div class="icon-play">
                        <i class="fa-duotone fa-play fa-bounce"></i>
                    </div>
                </a>
                ${renderButton(movie)}
                <span class="language">${movie.lang}</span>
            </figure>
            <a href="./infoMovie-page.html" class="movie-name">${movie.name}</a>
        </div>
    `).join('')
}

export default movies
