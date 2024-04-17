// dynamic_navbar.js

// Function to determine the user's role (you need to implement this)
function getUserRole() {
    // Implement this function to fetch the user's role from the server or local storage
    // Return the user's role
    const token = localStorage.getItem('jwt'); // Implement this function to decode JWT
    const decodedToken = decodeJWT(token);
    const userRole = decodedToken.role
    return userRole
}

// Function to include the appropriate navbar based on the user's role
async function includeNavbar() {
    await getUserRole();
    let navbarTemplate = '';

    switch (userRole) {
        case 'Admin':
            navbarTemplate = 'adminnavbar.html';
            break;
        case 'Shelter':
            navbarTemplate = 'shelternavbar.html';
            break;
        case 'User':
            navbarTemplate = 'generalnavbar.html';
            break;
        default:
            // Handle unrecognized user type
            navbarTemplate= 'generalnavbar.html'
            break;
    }

    // Include the navbar template in the appropriate location on the page
    const navbarContainer = document.getElementById('navbar-container');
    const response = await fetch(navbarTemplate);
    const navbarHTML = await response.text();
    navbarContainer.innerHTML = navbarHTML;
}

// Call the includeNavbar function when the page loads
document.addEventListener('DOMContentLoaded', includeNavbar);
