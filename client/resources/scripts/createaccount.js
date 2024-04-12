//const test = new apiUrls();

const shelterUrl = "http://localhost:5016/api/shelters"
const userUrl = "http://localhost:5016/api/user"
//idk if this is what its called
//const shelterPrivacyUrl ="http://localhost:5016/api/ShelterPrivacy"

let shelterPrivacy
// const shelterUrl = test.shelterUrl
// const userUrl = test.userUrl

async function handleUButtonClick(){
    await handleAddUser()
    //window.location.href = "login.html"
}

async function handleSButtonClick(){
    await handleAddShelter()
    //window.location.href = "login.html"
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
}
//USER FUNCTIONS
async function handleAddUser(){
    let user = {
        //username, passwordHash, fname, lname, address, role, and favorite pets are temporary
        userId: crypto.randomUUID(),
        email: document.getElementById('userEmail').value,
        password : document.getElementById('userPassword').value,
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        address: document.getElementById('userZip').value,
        phoneNumber: document.getElementById('userPhone').value,
        favoritePets: 0,
        role: "user"
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

async function getAllUsers(){
    let response = await fetch(userUrl)
    return await response.json()
}
//SHELTER FUNCTIONS
async function getAllShelters(){
    let response = await fetch(shelterUrl);
    return await response.json();

    // let response = await fetch(shelterUrl)
    // shelters = await response.json()
    // console.log(shelters)
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
            <th>Status</th>
            <th>Approve</th>
        </tr>`
    shelters.forEach(function(shelter){
        //change approval button to use approvalStatus
        if(shelter.approvalStatus != "approved"){
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
                <td>${shelter.approvalStatus}</td>
                <td><button class="btn btn-primary" onclick="handleShelterApproval('${shelter.id}')">Approve</button></td>
            </tr>
            `
        }
    })
    
    html += `
    </table>
    `
    document.getElementById('shelterTable').innerHTML = html
}

async function handleAddShelter(){
    let shelter = {
        shelterid: crypto.randomUUID(),
        shelterName: document.getElementById('shelterName').value,
        email: document.getElementById('shelterEmail').value,
        phone: document.getElementById('shelterPhone').value,
        addressLine: document.getElementById('shelterAddressLine').value,
        city: document.getElementById('shelterCity').value,
        state: document.getElementById('shelterState').value,
        zip: document.getElementById('shelterZip').value,
        password : document.getElementById('shelterPassword').value,
        approvalStatus: "pending"
    }

    shelterPrivacy = {
        id: shelterid,
        intakeDatePrivate: false,
        weightPrivate: false,
        attitudePrivate: false,
        aboutMePrivate: false,
        heightPrivate: false,
        houseTrainedPrivate: false
    }
    await saveShelter(shelter)
    await saveShelterPrivacy(shelterPrivacy)
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

async function saveShelterPrivacy(shelterPrivacy){
    await fetch(shelterPrivacyUrl, {
            method: "POST",
            body: JSON.stringify(shelterPrivacy),
            headers: {
                "Content-type" : "application/json; charset=UTF-8"
            }
    })
}

async function handleShelterApproval(id){
    //1
    const shelter = shelters.find(shelter => shelter.id === id)
    if (shelter) {
        shelter.approvalStatus = "approved"
        console.log(shelter.approvalStatus)
    }
    //2 have put api method in backend that changes approved to opposite
    await fetch(shelterUrl + '/' +id,{
        method: "PUT",
        body: JSON.stringify(shelter),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    })

    populateShelterTable()
}

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


