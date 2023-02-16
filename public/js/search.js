document.getElementById("searchButton").addEventListener("click", function(event) {
    event.preventDefault();
    let ticker = document.querySelector(`#getTicker`).value.trim();
    document.location.replace('/search/' + ticker);
    // window.location.href ='/search/' + ticker
});

document.getElementById("getTicker")
    .addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("searchButton").click();
    }
});