const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#signup-name').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                name,
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
                location.reload();
              }
            };
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('click', signupFormHandler);