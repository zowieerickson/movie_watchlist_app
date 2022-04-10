const searchBtn = document.querySelector("#search-movie-btn");
const searchText = document.querySelector("#search-movie");
const moviesContainer = document.querySelector("#container-movies");
const posterPlaceholder = 'img/poster-placeholder.png';
let searchQuery;
let movieId;
let html = '';


searchBtn.addEventListener("click", function() {
    searchQuery = searchText.value
    html = ''

    fetch(`http://www.omdbapi.com/?apikey=c649a9b9&s=${searchQuery}&page=1&`)
    .then(rsp => rsp.json())
    .then(data => {
        const movies = data.Search;
        for (let movie of movies) {
            movieId = movie.imdbID
            fetch(`http://www.omdbapi.com/?apikey=c649a9b9&i=${movieId}&page=1`)
                .then(rsp => rsp.json())
                .then(data => {
                    console.log(data)
                    console.log(data.Plot)
                    html += `
                    <div class="parent-test-flex">
                        <img class="movie-poster" src="${data.Poster == 'N/A' ? posterPlaceholder : data.Poster}" alt="">
                        <div class="flex-col">
                            <div class="second-test-flex"> 
                                <h2 class="movie-title">${data.Title}</h2>
                                <img class="movie-star-icon" src="img/star.svg" alt="Yellow star">
                                <p class="movie-rating">${data.imdbRating}</p>
                            </div>
                            <div class="second-test-flex">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <p class="movie-add"><a class="flex" href="index.html"><img src="img/plus-add-icon.svg" alt="Addtion icon" class="mrg-rt-sml">Watchlist</a></p>
                            </div>
                            <p class="movie-plot">${strEllipsis(data.Plot)}</p>
                        </div>
                    </div>`;
                    moviesContainer.innerHTML = html;
                    const readMore = document.querySelectorAll(".read-more");

                    console.log(readMore)

                    readMore.forEach(element => {
                        element.addEventListener('click', (e) => {
                            console.log('read more CLICKED');
                            fetch(`http://www.omdbapi.com/?apikey=c649a9b9&i=${movieId}&page=1&plot=full`)
                                .then(rsp => rsp.json())
                                .then(data => {
                                    // NOT WORKING YET, BUT SOMETHING IS HAPPENING!
                                    console.log(element)
                                    console.log(data);
                                    document.querySelector(".movie-plot").innerHTML = data.Plot
                                })
                        })
                    })
            })
        }

    })
})

searchText.addEventListener("keypress", function(e) {


    if (e.key === 'Enter') {
        searchQuery = searchText.value
        console.log(searchQuery)

        fetch(`http://www.omdbapi.com/?apikey=c649a9b9&t=${searchQuery}`)
        .then(rsp => rsp.json())
        .then(data => {
            console.log(data)
            html += `<img src=${data.Poster}>`
            console.log(html)
            document.querySelector("#container-movies").innerHTML = html;
        })
    }
})

function strEllipsis(string) {
    strLength = string.length;
    if(strLength == 233) {
        console.log(strLength);
        console.log('give me dots');
        console.log(string + '... Read more');
        return string + '... <a class="read-more"><span class="black-color">Read more</span></a>';
    } else {
        return string;
    }
}

