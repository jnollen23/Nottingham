// const { Watchlist } = require("../models");

document.getElementById("searchButton").addEventListener("click", function(event) {
    event.preventDefault();
    let ticker = document.querySelector(`#getTicker`).value.trim();
    document.location.replace('/search/' + ticker);
});

document.getElementById("getTicker")
    .addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("searchButton").click();
    }
});

// document.getElementById("addToWatch").addEventListener("click", function(event) {
//     event.preventDefault();
//     console.log(window.location.pathname)
//     // let ticker = document.querySelector(`#getTicker`).value.trim();
    
//     // document.location.replace('/search/' + ticker + '/add');
// });