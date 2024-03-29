const movies = (data) => {
    return data.map(movie => `
        <div class="movie" data-slug="https://phimapi.com/phim/${movie.slug}">
            <figure>
                <a href="./infoMovie-page.html">
                    <img src="${movie.poster_url.includes('https://img.phimapi.com') ? movie.poster_url : 'https://img.phimapi.com/' + movie.poster_url}" alt="">
                    <div class="icon-play">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </a>
                <span class="language">${movie.lang}</span>
            </figure>
            <a href="./infoMovie-page.html" class="movie-name">${movie.name}</a>
        </div>
    `).join('');
}

export default movies