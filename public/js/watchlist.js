async function deleteItem(list, item) {
    const fuck = await fetch("/watchlist/", {
        method: `DELETE`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ list: list, stock: item })
    })
        .then(response => response.json())
        .then(() => {
            window.location.reload()
            return false;
        });
}