// import ApiUrls from './apiUrls.js';
// const apiUrls = new ApiUrls();

// const shelterUrl = "https://localhost:5016/api/shelters"
// const userUrl = "https://localhost:5016/api/users"

const shelterUrl = apiUrls.shelterUrl
const userUrl = apiUrls.userUrl

async function handleUButtonClick(){
    await handleAddUser()
    window.location.href = "login.html"
}

async function handleSButtonClick(){
    await handleAddShelter()
    window.location.href = "login.html"
}

// function login() {
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('password').value;

//     if(email == "admin@aap.org" && password == "w00fme0w"){
//         userType = 'admin'
//     }
//     // Perform login authentication here
//     showSuccessMessage('Login successful!'); // You can customize the message
//     console.log('Logging in with email:', email, 'and password:', password);
// }

async function handleOnLoad(){
    await populateShelterTable()
    await populateAppShelterTable()
}
//USER FUNCTIONS
async function handleAddUser(){
    let user = {
        //username, passwordHash, fname, lname, address, role, and favorite pets are temporary
        userId: crypto.randomUUID(),
        userEmail: document.getElementById('userEmail').value,
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        phoneNumber: document.getElementById('userPhone').value,
        userZip: document.getElementById('userZip').value,
        password : document.getElementById('userPassword').value,
        role: "user",
        favoritePets: 0
    }
    await saveUser(user)
}

async function saveUser(user){
    await fetch(userUrl, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type" : "application/json; charset=UTF-8"
            }
    })
}
//SHELTER FUNCTIONS
async function getAllShelters(){
    let response = await fetch(userUrl)
    shelters = await response.json()
    console.log(shelters)
}

async function populateShelterTable(){
    await getAllShelters()
    let html = `
    <table class = "table table-striped">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address Line</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Approve Account</th>
        </tr>`
    shelters.forEach(function(shelter){
        if(shelter.approved == false){
            html+= `
            <tr>
                <td>${shelter.id}</td>
                <td>${shelter.name}</td>
                <td>${shelter.email}</td>
                <td>${shelter.phone}</td>
                <td>${shelter.addressLine}</td>
                <td>${shelter.city}</td>
                <td>${shelter.state}</td>
                <td>${shelter.zip}</td>
                <td><button class="btn btn-link" onclick="handleShelterApproval('${shelter.id}')"><i class="far ${shelter.approved ? 'fa-check-square' : 'fa-square'}" style="color: ${shelter.approved ? 'green' : 'black'};"></i></button></td>
            </tr>
            `
        }
            //maybe ad <td> for shelter.password? idk if not having it will mess up the backend
            //<td><button class="btn btn-link" onclick="handleShelterApproval('${shelter.id}')"><i class="fa${shelter.approved ? 's' : 'r'} fa-heart" style="color: ${shelter.approved ? 'red' : 'black'};"></i></button></td>
    })
    
    html += `
    </table>
    `
    document.getElementById('shelterTable').innerHTML = html
}

async function populateAppShelterTable(){
    await getAllShelters()
    // Filter shelters to get only approved ones
    let approvedShelters = shelters.filter(shelter => shelter.approved)
    let html = `
    <table class="table table-striped">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address Line</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Approve Account</th>
        </tr>`;
    approvedShelters.forEach(function(shelter){
        html += `
        <tr>
            <td>${shelter.id}</td>
            <td>${shelter.name}</td>
            <td>${shelter.email}</td>
            <td>${shelter.phone}</td>
            <td>${shelter.addressLine}</td>
            <td>${shelter.city}</td>
            <td>${shelter.state}</td>
            <td>${shelter.zip}</td>
            <td><button class="btn btn-link" onclick="handleShelterApproval('${shelter.id}', this)"><i class="far fa-check-square" style="color: green;"></i></button></td>
        </tr>`;
    });
    
    html += `
    </table>`;
    document.getElementById('appShelterTable').innerHTML = html;
}


async function handleAddShelter(){
    let shelter = {
        //id: crypto.randomUUID(),
        shelterName: document.getElementById('shelterName').value,
        email: document.getElementById('shelterEmail').value,
        phone: document.getElementById('shelterPhone').value,
        addressLine: document.getElementById('shelterAddressLine').value,
        city: document.getElementById('shelterCity').value,
        state: document.getElementById('shelterState').value,
        zip: document.getElementById('shelterZip').value,
        password : document.getElementById('shelterPassword').value,
        approvalStatus: "Pending",
        approved: false
    }
    await saveShelter(shelter)
    populateShelterTable()
}

async function saveShelter(shelter){
    await fetch(shelterUrl, {
            method: "POST",
            body: JSON.stringify(shelter),
            headers: {
                "Content-type" : "application/json; charset=UTF-8"
            }
    })
}

async function handleShelterApproval(id, button){
    //1
    const shelter = shelters.find(shelter => shelter.id === id)
    if (shelter) {
        shelter.approved = !shelter.approved
        shelter.approvalStatus = "approved"
        console.log(shelter.approved)
    }
    //2 have put api method in backend that changes approved to opposite
    await fetch(shelterUrl + '/' +id,{
        method: "PUT",
        body: JSON.stringify(shelter),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    })
    // Update the button icon
    const icon = button.querySelector("i");
    icon.classList.toggle("fa-square");
    icon.classList.toggle("fa-check-square");
    // Update the icon color
    icon.style.color = shelter.approved ? "green" : "black";

    populateShelterTable()
}

// Function to display success message
// function showSuccessMessage(message) {
//     var modal = document.createElement('div');
//     modal.className = 'success-modal';
//     modal.innerHTML = `
//         <div class="modal-dialog">
//             <div class="modal-content">
//                 <div class="modal-header">
//                     <h5 class="modal-title">Success!</h5>
//                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div class="modal-body">
//                     <p>${message}</p>
//                 </div>
//             </div>
//         </div>
//     `;
//     document.body.appendChild(modal);
//     setTimeout(function() {
//         modal.remove();
//     }, 3000);
// }

// Example function for signup
//function signup(role) {
    // Perform signup process
    // If signup is successful, show success message
    //showSuccessMessage('Signup successful!'); // You can customize the message
//}


// function signup(role) {
//     var userData = {}

//     // Collect common fields
//     userData.id = crypto.randomUUID()
//     userData.email = document.getElementById(role + 'Email').value
//     userData.addressLine = document.getElementById(role + 'AddressLine').value
//     userData.city = document.getElementById(role + 'City').value
//     userData.state = document.getElementById(role + 'State').value
//     userData.zip = document.getElementById(role + 'Zip')
//     userData.password = document.getElementById(role + 'Password').value

//     // Collect user type-specific fields
//     if (role === 'user') {
//         userData.fullName = document.getElementById('name').value
//     } else if (role === 'shelter') {
//         userData.shelterName = document.getElementById('shelterName').value
//         userData.phone = document.getElementById('shelterPhone').value
        
//     }
//     // Perform signup logic here based on user type
//     const express = require('express');
//     const bodyParser = require('body-parser');
//     const app = express();
//     const port = 3000;

//     // Dummy database
//     let users = [];

//     app.use(bodyParser.json());

//     // Signup endpoint
//     app.post('/signup', (req, res) => {
//         const { email, password, role } = req.body;
//         let additionalData = {};
//         // Additional data specific to user type
//         if (role === 'user') {
//             const { fullName, city, state } = req.body;
//             additionalData = { fullName, city, state };
//         } else if (role === 'admin') {
//             const { shelterName, phone, address } = req.body;
//             additionalData = { shelterName, phone, address };
//         }
//         // Validate signup data (e.g., check for required fields)
//         if (!email || !password) {
//             return res.status(400).json({ error: 'Email and password are required' });
//         }
//         // Check if the email is already registered
//         if (users.some(user => user.email === email)) {
//             return res.status(400).json({ error: 'Email is already registered' });
//         }
//         // Perform signup
//         const newUser = {
//             email,
//             password,
//             role,
//             ...additionalData,
//             approved: role === 'admin' ? false : true // Set approval status for admin accounts
//         };
//         users.push(newUser);
//         // Optionally, you can send a confirmation email or perform other actions here
//         res.status(201).json({ message: 'Signup successful', user: newUser });
//     });

//     app.listen(port, () => console.log(`Server running on port ${port}`));

//     console.log('Signing up as', userType, 'with username:', email, 'and password:', password);
// }


