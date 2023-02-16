
//--------------------code to future add stock to watch list-------------//
// const { Watchlist } = require("../models");

// document.getElementById("addToWatch").addEventListener("click", function(event) {
//     event.preventDefault();
//     console.log(window.location.pathname)
//     // let ticker = document.querySelector(`#getTicker`).value.trim();
    
//     // document.location.replace('/search/' + ticker + '/add');
// });

const searchFormHandler = async (event) => {
    event.preventDefault();

    let ticker = document.querySelector(`#getTicker`).value.trim();
    document.location.replace('/search/' + ticker);
    console.log("you hit the button")
}

document
    .querySelector('.search-form')
    .addEventListener('click', searchFormHandler);

var input = document.getElementById("getTicker");
    input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});

//-----------Test data for modal----------------------------------
// const modal = document.querySelector(".modal");
// const trigger = document.querySelector(".trigger");
// const closeButton = document.querySelector(".close-button");

// function toggleModal() {
//     modal.classList.toggle("show-modal");
// }

// function windowOnClick(event) {
//     if (event.target === modal) {
//         toggleModal();
//     }
// }

// trigger.addEventListener("click", toggleModal);
// closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);
