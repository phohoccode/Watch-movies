import { handleWatchNow } from "./handleContent.js"

const Slides = (data) => {
    return data.map(slide => `
    <div class="slide">
        <figure>
            <img 
                loading="lazy"
                src="${slide?.thumb_url.includes('https://img.phimapi.com') ?
                        slide?.thumb_url :
                        'https://img.phimapi.com/' + slide?.thumb_url}" 
                alt=""
            >
        </figure>
        <div class="movie-info">
            <h3>${slide?.name}</h3>
            <div class="movie-info__bottom">
                <a  
                    onclick="handleWatchNow(event, this)"
                    class="watch-now" 
                    href="./watchMovie-page.html" 
                    data-slug="https://phimapi.com/phim/${slide?.slug}"
                >
                        <i class="fa-solid fa-play"></i>
                    Xem ngay
                </a>
                <span class="year">${slide?.year}</span>
            </div>
        </div>
    </div>
    `).join('');
}
export default Slides
