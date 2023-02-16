function deleteItem(list, item) {
    fetch("/watchlist/", {
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

function deleteList(name){
    fetch(`/watchlist/${name}`, {
        method: `DELETE`
    })
        .then(response => response.json())
        .then((data) => {
            if(data.message === "deleted successfully")
            window.location.reload()
            return false;
        });
}
function createNewList(){
    const element = document.getElementById('create-list');
    element.style.display = 'none';

    const name = document.getElementById('list-id').value.trim();
    fetch(`/api/watchlist/create/${name}`,{
        method:'POST'
    })
    .then(response => response.json())
    .then(data=>{
        if(data.message === "created successfully"){
            window.location.reload();
            return false;
        }
        else{
            const error = document.getElementById('failed-list');
            error.style.display = 'initial';
            window.onclick = function(event){
                error.style.display='none';
            }
        }
    })
}

function showCreateModal(){
    const element = document.getElementById('create-list');
    element.style.display = "initial";
    
    window.onclick = function (event) {
        if (event.target == element) {
           element.style.display = "none";
        }
    };
}

function showDeleteOption(name){
    const element = document.getElementById(name);
    element.style.display = "initial";
    
    window.onclick = function (event) {
        if (event.target == element) {
           element.style.display = "none";
        }
    };
}