const baseUrl = "http://localhost:5016/api"

let shelterID

function handleOnLoad() {
    const token = localStorage.getItem('jwt');
    const decodedToken = decodeJWT(token);
    shelterID = decodedToken.nameid
    console.log(shelterID);
    getUserInfo(shelterID)
}

async function getUserInfo(shelterID) {
    let response = await fetch(baseUrl + '/shelters/' + shelterID);
    const user = await response.json();
    console.log(user);
    if (user) {
        displayUserInfo(user);
    } else {
        // No user found with the given role ID
        displayBlankInfoColumn();
    }
}

function displayUserInfo(user) {
    let html = getShelterHtml(user)
    document.getElementById('userTableContainer').innerHTML = html;
}

function getShelterHtml(user) {
    // Generate HTML for shelter role
    return `
    <table id="shelterTable">
    <tr>
        <th>Account Info</th>
        <th></th>
    </tr>
    <tr>
        <td>Shelter Name:</td>
        <td><span id="shelter_Name">${user.shelter_Name}</span></td>
    </tr>
    <tr>
        <td>Email:</td>
        <td><span id="email">${user.email}</span></td>
    </tr>
    <tr>
        <td>Phone:</td>
        <td><span id="phone_Number">${user.phone_Number}</span></td>
    </tr>
    <tr>
        <td>Address Line:</td>
        <td><span id="addressLine">${user.addressLine}</span></td>
    </tr>
    <tr>
        <td>City:</td>
        <td><span id="city">${user.city}</span></td>
    </tr>
    <tr>
        <td>State:</td>
        <td><span id="state">${user.state}</span></td>
    </tr>
    <tr>
        <td>Zip/Postal Code:</td>
        <td><span id="zipCode">${user.zipCode}</span></td>
    </tr>
    <tr>
        <td colspan="2">
            <button class="btn btn-primary" onclick="toggleEdit()">Edit</button>
            <button class="btn btn-primary" onclick="saveChanges()">Save</button>
        </td>
     </tr>
</table>`;
}


function displayBlankInfoColumn() {
    const html = `
        <table id="userTable">
            <tr>
                <th>Account Info</th>
                <th></th>
            </tr>
            <tr>
                <td colspan="2">No user information available. Please Login or Create an Account</td>
            </tr>
        </table>`;
    
    document.getElementById('userTableContainer').innerHTML = html;
}

function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

function toggleEdit() {
    const cells = document.querySelectorAll(`#shelterTable span`);
    console.log('Cells:', cells);
    cells.forEach(function(cell) {
        if (!cell.querySelector('input')) {
            const input = document.createElement('input');
            input.value = cell.innerText;
            cell.innerHTML = '';
            cell.appendChild(input);
        }
    });
}



function saveChanges() {
    const cells = document.querySelectorAll(`#shelterTable span`);
    const updatedShelter = {};
    cells.forEach(function(cell) {
        const fieldName = cell.id; // Assuming cell id matches the field name in the data
        const input = cell.querySelector('input');
        const value = input.value;
        updatedShelter[fieldName] = value;
        // Replace the input field with a span containing the new value
        const span = document.createElement('span');
        span.textContent = value;
        cell.innerHTML = '';
        cell.appendChild(span);
    });
    // const cells = document.querySelectorAll(`#shelterTable span`);
    // const updatedShelter = {};
    // cells.forEach(function(cell) {
    //     const fieldName = cell.id; // Assuming cell id matches the field name in the data
    //     const value = cell.querySelector('input').value;
    //     updatedShelter[fieldName] = value;
    // });
    // Send updatedShelter to the backend to update the profile info
    updateShelter(shelterID, updatedShelter);
}

async function updateShelter(shelterID, updatedShelter) {
    await fetch(baseUrl + '/shelters/' + shelterID, {
        method: "PUT",
        body: JSON.stringify(updatedShelter),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}


// async function saveShelterChanges(shelterID) {
//     const cells = document.querySelectorAll('#shelterTable span');
//     //getShelterDataFromCells(cells);
//     await updateShelter(shelterID);
// }

// function getShelterDataFromCells() {
//     // Extract data from cells for shelter table
//     // Example:
// }
// async function updateShelter(shelterID) {
//     let shelter ={
//         addressLine: document.getElementById('addressLine').value,
//         city: document.getElementById('city').value,
//         state: document.getElementById('state').value,
//         zipCode: document.getElementById('zipCode').value,
//         phoneNumber: document.getElementById('phoneNumber').value,
//         email: document.getElementById('email').value,
//         shelterName: document.getElementById('shelterName').value
//     };
//     await fetch(baseUrl + '/shelters/' + shelterID, {
//         method: "PUT",
//         body: JSON.stringify(shelter),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     });
// }