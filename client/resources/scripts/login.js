
const authenticationUrl = "http://localhost:5016/api/Authentication/login";

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm')
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault() // Prevent default form submission
            
            // Get email, password, and user type from form fields
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            const role = document.querySelector('input[name="role"]:checked').value // Assuming radio buttons for user type

            // Send login request to backend API
            const response = await fetch(authenticationUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, role }) // Include user type in the request body
            });

            // Check if login was successful
            if (response.ok) {
                // Redirect user to appropriate dashboard or perform other actions based on user type
                const responseData = await response.json();
                const token = responseData.token;

                // Save token to local storage
                localStorage.setItem('jwt', token);

                document.getElementById('loginLogoutLink').textContent = 'Logout';
                
                console.log('Login successful. JWT token:', responseData.token);
                // Redirect logic based on user type
                switch (role) {
                    case 'Admin':
                        // Redirect to admin dashboard
                        break;
                    case 'Shelter':
                        // Redirect to shelter dashboard
                        break;
                    case 'User':
                        // Redirect to user dashboard
                        break;
                        default:
                            // Handle unrecognized user type
                }
            } else {
                // Display error message in popup modal
                const errorModal = document.getElementById('errorModal');
                const errorMessage = document.getElementById('errorMessage');
                errorMessage.textContent = 'Login failed. Please check your credentials.';
                errorModal.style.display = 'block';

                // Close the modal when the user clicks on the close button
                const closeButton = document.querySelector('.close');
                closeButton.addEventListener('click', function() {
                    errorModal.style.display = 'none';
                });
            }
        });
    }
});
        
        // const authenticationUrl = "http://localhost:5016/api/Authentication/login";
        
        // document.getElementById('loginForm').addEventListener('submit', async function(event) {
        //     event.preventDefault(); // Prevent default form submission
        
        //     // Get email, password, and user type from form fields
        //     const email = document.getElementById('email').value;
        //     const password = document.getElementById('password').value;
        //     const role = document.querySelector('input[name="role"]:checked').value; // Assuming radio buttons for user type
        
        
        //     //---------------- You had this portion below turning the users response 
        //     //---------------- into a JSON object but the authenticationManager was still coded to
        //     //---------------- take in a set of three strings. 
        
        //     // Send login request to backend API
        //     const response = await fetch(authenticationUrl, {
                
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ email, password, role }) // Include user type in the request body
        //     });
        
        //     // Check if login was successful
        //     if (response.ok) {
        //         // Redirect user to appropriate dashboard or perform other actions based on user type
        //         const responseData = await response.json();
        //         const token = responseData.token;
        
        //         // save token to local storage
        //         localStorage.setItem('jwt', token)
        
        //         document.getElementById('loginLogoutLink').textContent = 'Logout';
        
        //         console.log('Login successful. JWT token:', responseData.token);
        //         // Redirect logic based on user type
        //         switch (role) {
        //             case 'Admin':
        //                 // Redirect to admin dashboard
        //                 break;
        //             case 'Shelter':
        //                 // Redirect to shelter dashboard
        //                 break;
        //             case 'User':
        //                 // Redirect to user dashboard
        //                 break;
        //             default:
        //                 // Handle unrecognized user type
        //         }
        //     } else {
        //         // Display error message to the user
        //         console.error('Login failed. Please check your credentials.');
        //     }
        // });
