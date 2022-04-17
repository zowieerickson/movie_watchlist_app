const searchBtn = document.querySelector("#search-movie-btn");
const searchText = document.querySelector("#search-movie");
const moviesContainer = document.querySelector("#container-movies");
const watchlistMoviesContainer = document.querySelector("#container-watchlist-movies")
console.log(watchlistMoviesContainer)
const posterPlaceholder = 'img/poster-placeholder.png';
let searchQuery;
// let movieId;
// let html = '';
let movieArr = [];
let savedMoviesArr = [];
// let readMoreIdArr = [];
// let readMore;
// let watchlistBtn;

// searchBtn.addEventListener("click", function() {
//     searchQuery = searchText.value
//     html = '';
//     fetch(`http://www.omdbapi.com/?apikey=c649a9b9&s=${searchQuery}&page=1&`)
//     .then(rsp => rsp.json())
//     .then(data => {
//         const movies = data.Search;
//         for (let movie of movies) {
//             fetch(`http://www.omdbapi.com/?apikey=c649a9b9&i=${movie.imdbID}&page=1`)
//                 .then(rsp => rsp.json())
//                 .then(data => {
//                     console.log(movie.imdbID)
//                     createMovieHTML(data)
//                     moviesContainer.innerHTML = html;
//                     if (data.Plot.length > 230) {
//                         fetch(`http://www.omdbapi.com/?apikey=c649a9b9&i=${movie.imdbID}&page=1&plot=full`)
//                             .then(rsp => rsp.json())
//                             .then(data => {
//                                 console.log(data)
//                                 const fullPlot = data.Plot;
//                                 movieArr.push(data)
//                                 console.log(movieArr)
//                                 // readMoreIdArr.push(fullPlot)
//                                 // console.log(readMoreIdArr)
//                                 readMore = document.querySelectorAll(".read-more");
//                                 readMore.forEach(ele => {
//                                     ele.addEventListener("click", (e) => {
//                                         console.log(e.target.parentElement.parentElement)
//                                         console.log(readMoreIdArr)
//                                         // e.target.parentElement.parentElement.innerHTML = fullPlot
//                                         // const title = e.target.parentElement.parentElement.closest(".movie-title")
//                                         for (let i = 0; i < readMoreIdArr.length; i++) {
//                                             console.log("uhh hi?")
//                                         }
//                                     })
//                                 })
//                             })
//                     }
//                 })
//             }
//     })
// })

// function strEllipsis(string) {
//     strLength = string.length;
//     if(strLength > 231) {
//         return string + '... <a class="read-more"><span class="black-color">Read more</span></a>';
//     } else {
//         return string;
//     }
// }

// function createMovieHTML(data) {
//    html += `
//     <div class="parent-test-flex">
//         <img class="movie-poster" src="${data.Poster == 'N/A' ? posterPlaceholder : data.Poster}" alt="">
//         <div class="flex-col">
//             <div class="second-test-flex"> 
//                 <h2 class="movie-title">${data.Title}</h2>
//                 <img class="movie-star-icon" src="img/star.svg" alt="Yellow star">
//                 <p class="movie-rating">${data.imdbRating}</p>
//             </div>
//             <div class="second-test-flex">
//                 <p>${data.Runtime}</p>
//                 <p>${data.Genre}</p>
//                 <p class="movie-add"><img src="img/plus-add-icon.svg" alt="Addtion icon" class="mrg-rt-sml">Watchlist</p>
//             </div>
//             <p class="movie-plot">${strEllipsis(data.Plot)}</p>
//         </div>
//     </div>`;

//     cwatchlistBtn = document.querySelector(".movie-add");
//     console.log(watchlistBtn)

//     return html
// }



// STORAGE
// Readmore functionality
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

let html;
let oldData;

if (searchBtn) {
    searchBtn.addEventListener("click", handleSearchClick)
}


async function handleSearchClick() {
    html = "";
    searchQuery = searchText.value;
    const response = await fetch(`http://www.omdbapi.com/?apikey=c649a9b9&s=${searchQuery}`);
    const data = await response.json();
    const movies = data.Search;
    for (let movie of movies) {
        // console.log(movie)
        const response2 = await fetch(`http://www.omdbapi.com/?apikey=c649a9b9&i=${movie.imdbID}&page=1`);
        const data2 = await response2.json();
        // console.log(data);
        // console.log(data2);
        movieArr.push(data2)
        createMovieHTML(data2);
    }
    moviesContainer.innerHTML = html
    // console.log(data);
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
                <p id=${data.imdbID} class="movie-add"><img src="img/plus-add-icon.svg" alt="Addtion icon" class="mrg-rt-sml">Watchlist</p>
            </div>
            <p class="movie-plot">${(data.Plot)}</p>
        </div>
    </div>`;

    return html
}

document.body.addEventListener('click', function (e) {
    const target = e.target
    if(target.className == 'movie-add') {
        const movieTitle = target.parentElement.previousElementSibling.querySelector('.movie-title').textContent
        const found = movieArr.find(element => element.Title = movieTitle);
        console.log(found)
        // localStorage.setItem(JSON.stringify(found.Title), JSON.stringify(found));
        console.log(localStorage)
        console.log(localStorage.length)

        // if there is nothing saved at the start then save an empty array
        if (localStorage.getItem('data') == null) {
            localStorage.setItem('data', '[]');
        }

        // get old data and add it to the new data
        let oldData = JSON.parse(localStorage.getItem('data'));
        oldData.push(found)
        console.log(oldData)

        // save the old + new data to local storage
        localStorage.setItem('data', JSON.stringify(oldData))

        console.log(typeof oldData)

    };
  });

  function viewLocalStorage() {
      if (localStorage.getItem('data') != null) {
          let yo = JSON.parse(localStorage.getItem('data'))
          for (let i = 0; i < yo.length; i++) {
              console.log(yo[i])
              createMovieHTML(yo[i])
          }
          console.log(yo)
          document.querySelector("#container-watchlist-movies").innerHTML = html
      }
  }

//   viewLocalStorage()

// function strEllipsis(string) {
//     strLength = string.length;
//     if(strLength > 231) {
//         return string + '... <a class="read-more"><span class="black-color">Read more</span></a>';
//     } else {
//         return string;
//     }
// }

// localStorage.clear();