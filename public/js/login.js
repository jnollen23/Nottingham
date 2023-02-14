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
             location.reload();
      }
    };
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('click', loginFormHandler);
