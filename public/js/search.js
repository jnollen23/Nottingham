document.getElementById("searchButton").addEventListener("click", function() {
    const ticker = document.querySelector(`#getTicker`).value.trim();
    window.location.href ='/search/' + ticker
});