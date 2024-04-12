document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get email and password from form fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send login request to backend API
    const response = await fetch('/api/authentication', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // Send email and password in the request body
    });

    // Check if login was successful
    if (response.ok) {
        // Redirect user to dashboard or perform other actions
        const responseData = await response.json();
        console.log('Login successful. JWT token:', responseData.token);
    } else {
        // Display error message to the user
        console.error('Login failed. Please check your credentials.');
    }
});