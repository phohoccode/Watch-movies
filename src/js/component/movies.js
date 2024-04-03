const listOfMoviesToWatchLater = JSON.parse(localStorage.getItem('listMoviesToWatchLater'))

const movies = (data) => {
    return data.map(movie => `
        <div class="movie" data-slug="https://phimapi.com/phim/${movie.slug}">
            <figure>
                <a href="./infoMovie-page.html">
                    <img src="${movie.poster_url.includes('https://img.phimapi.com') ? movie.poster_url : 'https://img.phimapi.com/' + movie.poster_url}" alt="">
                    <div class="icon-play">
                        <i class="fa-duotone fa-play fa-bounce"></i>
                    </div>
                </a>
                <button data-slug="${movie.slug}" 
                    class="add-movie ${listOfMoviesToWatchLater.some(item => item.slug === movie.slug) ? 'active' : ''}" 
                >
                    <i onclick="handleClickAddMovie(this)" class="icon-add fa-light fa-plus"></i>
                    <i onclick="handleClickRemoveMovie(this)" class="icon-remove fa-light fa-minus"></i>
                </button>
                <span class="language">${movie.lang}</span>
            </figure>
            <a href="./infoMovie-page.html" class="movie-name">${movie.name}</a>
        </div>
    `).join('');
}

export default movies