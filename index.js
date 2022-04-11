const searchBtn = document.querySelector("#search-movie-btn");
const searchText = document.querySelector("#search-movie");
const moviesContainer = document.querySelector("#container-movies");
const posterPlaceholder = 'img/poster-placeholder.png';
let searchQuery;
let movieId;
let html = '';
let readMoreIdArr = [];
let readMore;




searchBtn.addEventListener("click", function() {
    searchQuery = searchText.value

    fetch(`http://www.omdbapi.com/?apikey=c649a9b9&s=${searchQuery}&page=1&`)
    .then(rsp => rsp.json())
    .then(data => {
        const movies = data.Search;
        for (let movie of movies) {
            movieId = movie.imdbID
            fetch(`http://www.omdbapi.com/?apikey=c649a9b9&i=${movieId}&page=1`)
                .then(rsp => rsp.json())
                .then(data => {

                    createMovieHTML(data)
                    moviesContainer.innerHTML = html;

                    // if (data.Plot.length > 230) {
                    //     readMoreIdArr.push(data.imdbID);
                    //     console.log(readMoreIdArr)
                    //     fetch(`http://www.omdbapi.com/?apikey=c649a9b9&i=${movieId}&page=1&plot=full`)
                    //         .then(rsp => rsp.json())
                    //         .then(data => console.log)
                    // }
                    
                    // readMore = document.querySelectorAll(".read-more");
                    // readMore.forEach(element => {
                    //     element.addEventListener('click', (e) => {
                    //         fetch(`http://www.omdbapi.com/?apikey=c649a9b9&i=${movieId}&page=1&plot=full`)
                    //             .then(rsp => rsp.json())
                    //             .then(data => {
                    //                 console.log(data);
                    //                 console.log(data.length)
                    
                    //                 document.querySelector(".movie-plot").innerHTML = data.Plot
                    //             })
                    //     })
                    // })

                })
            }

    })
})

function strEllipsis(string) {
    strLength = string.length;
    if(strLength > 231) {
        return string + '... <a class="read-more"><span class="black-color">Read more</span></a>';
    } else {
        return string;
    }
}

function createMovieHTML(data) {
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

    return html
}





// Add this later once searchBtn click listener is finished
// searchText.addEventListener("keypress", function(e) {
//     if (e.key === 'Enter') {
//         searchQuery = searchText.value

//         fetch(`http://www.omdbapi.com/?apikey=c649a9b9&t=${searchQuery}`)
//         .then(rsp => rsp.json())
//         .then(data => {
//             html += `<img src=${data.Poster}>`
//             document.querySelector("#container-movies").innerHTML = html;
//         })
//     }
// })