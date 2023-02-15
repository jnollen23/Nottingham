const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            var modal = document.querySelector(".modal");
            modal.style.display = "initial";
            window.onclick = function (event) {
          if (event.target == modal) {
             modal.style.display = "none";
      }
    };
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('click', loginFormHandler);

    

// // Get the modal
// var modal = document.getElementById("loginModal");

// // Get the button that opens the modal
// var btn = document.getElementById("loginModalBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }    
