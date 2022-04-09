const searchBtn = document.querySelector("#search-movie-btn")
const searchText = document.querySelector("#search-movie")
let searchQuery;

console.log(searchBtn, searchText)
let html = '';

// fetch(`http://www.omdbapi.com/?apikey=c649a9b9&t=up`)
//     .then(rsp => rsp.json())
//     .then(data => {
//         console.log(data)
//         html += `<img src=${data.Poster}>`
//         console.log(html)
//         document.querySelector("#container-movies").innerHTML = html;
//     })

searchBtn.addEventListener("click", function() {
    searchQuery = searchText.value
    console.log(searchQuery)
    html = ''

    fetch(`http://www.omdbapi.com/?apikey=c649a9b9&s=${searchQuery}`)
    .then(rsp => rsp.json())
    .then(data => {
        console.log(data)
        const movies = data.Search;
        console.log(movies)
        for(let movie of movies) {
            html += `
            <img src=${movie.Poster}>`
        }
        document.querySelector("#container-movies").innerHTML = html;
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