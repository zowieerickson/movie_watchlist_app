const searchBtn = document.querySelector("#search-movie-btn")
const searchText = document.querySelector("#search-movie")
const moviesContainer = document.querySelector("#container-movies")
let searchQuery;
let movieId;
let html = '';


searchBtn.addEventListener("click", function() {
    searchQuery = searchText.value
    console.log(searchQuery)
    html = ''

    fetch(`http://www.omdbapi.com/?apikey=c649a9b9&s=${searchQuery}&page=1`)
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
                        <img class="movie-poster" src="${data.Poster}" alt="">
                        <div class="flex-col">
                            <div class="second-test-flex"> 
                                <h2 class="movie-title">${data.Title}</h2>
                                <img class="movie-star-icon" src="img/star.svg" alt="Yellow star">
                                <p class="movie-rating">${data.imdbRating}</p>
                            </div>
                            <div class="second-test-flex">
                                <p>${data.Year}</p>
                                <p>${data.Genre}</p>
                                <p class="movie-add"><a class="flex" href="index.html"><img src="img/plus-add-icon.svg" alt="Addtion icon" class="mrg-rt-sml">Watchlist</a></p>
                            </div>
                            <p class="movie-description">${data.Plot}</p>
                        </div>
                    </div>`;
                    moviesContainer.innerHTML = html;
            })
        }
        console.log(moviesContainer.innerHTML)
        
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


//html template

// html += `
// <div class="parent-test-flex">
//     <img class="movie-poster" src="${movie.Poster}" alt="">
//     <div class="flex-col">
//         <div class="second-test-flex"> 
//             <h2 class="movie-title">Blade Runner</h2>
//             <img class="movie-star-icon" src="img/star.svg" alt="Yellow star">
//             <p class="movie-rating">8.1</p>
//         </div>
//         <div class="second-test-flex">
//             <p>${movie.Year}</p>
//             <p>Action, Drama, Sci-fi</p>
//             <p class="movie-add"><a class="flex" href="index.html"><img src="img/plus-add-icon.svg" alt="Addtion icon" class="mrg-rt-sml">Watchlist</a></p>
//         </div>
//         <p class="movie-description">A blade runner must pursue and 
//             terminate four replicants who stole a ship in space, and have returned to Earth 
//             to find their creator.</p>
//     </div>
// </div>`



// old btn listener
// searchBtn.addEventListener("click", function() {
//     searchQuery = searchText.value
//     console.log(searchQuery)
//     html = ''

//     fetch(`http://www.omdbapi.com/?apikey=c649a9b9&t=${searchQuery}&page=1-100`)
//     .then(rsp => rsp.json())
//     .then(data => {
//         console.log(data)
//         const movies = data.Search;
//         console.log(movies)
//         for(let movie of movies) {
//             html += `
//             <div class="parent-test-flex">
//                 <img class="movie-poster" src="${movie.Poster}" alt="">
//                 <div class="flex-col">
//                     <h2 class="movie-title">${movie.Title}</h2>
//                     <div class="second-test-flex">
//                         <p>${movie.Year}</p>
//                         <p>Action, Drama, Sci-fi</p>
//                         <p class="movie-add"><a class="flex" href="index.html"><img src="img/plus-add-icon.svg" alt="Addtion icon" class="mrg-rt-sml">Watchlist</a></p>
//                     </div>
//                     <p class="movie-description">A blade runner must pursue and 
//                         terminate four replicants who stole a ship in space, and have returned to Earth 
//                         to find their creator.</p>
//                 </div>
//             </div>`
//         }
//         document.querySelector("#container-movies").innerHTML = html;
//     })
// })