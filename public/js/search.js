document.getElementById("searchButton").addEventListener("click", function() {
    console.log("test")
    let ticker = document.querySelector(`#getTicker`).value.trim();
    window.location.href ='/search/' + ticker
});

