
const signUpButton = document.getElementById('signUp');
const logInButton = document.getElementById('logIn');
const container = document.getElementById('container');


signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

logInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get user inputs
        var email = document.getElementsByName('email')[0].value; //[0]is used access the first element in the array-like collection returned by getElementsByName
        var password = document.getElementsByName('password')[0].value;

        // Send the form data to the server
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        })
        .then(response => {
            if (response.redirected) {
                // Redirect manually by fetching the redirected URL
                window.location.href = response.url;
            } else {
                // Handle login failure (display an error message)
                alert('Invalid credentials. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
        
    });
});

