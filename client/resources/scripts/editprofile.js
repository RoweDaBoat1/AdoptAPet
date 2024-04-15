const baseUrl = "http://localhost:5016/api"

function handleOnLoad() {
    const token = localStorage.getItem('jwt');
    if (token) {
        const decodedToken = decodeJWT(token);
        let userID, shelterID, iD, role;
        // Check the role type and set the appropriate variable name for the ID
        if (decodedToken.role === 'User') {
            userID = decodedToken.nameid;
            role = 'User';
        } else if (decodedToken.role === 'Shelter') {
            shelterID = decodedToken.nameid; // Adjust here to use 'nameid' for 'shelter'
            role = 'Shelter';
        } else if (decodedToken.role === 'Admin') {
            iD = decodedToken.nameid;
            role = 'Admin';
        }

        console.log(shelterID);
        getUserInfo(userID, shelterID, iD, role); // Pass the IDs and role separately
    } else {
        // No token found, display blank info column
        displayBlankInfoColumn();
    }
}

async function getUserInfo(userID, shelterID, iD, role) {
    let response;
    switch (role) {
        case 'User':
            response = await fetch(baseUrl + '/user/' + userID);
            break;
        case 'Shelter':
            response = await fetch(baseUrl + '/shelters/' + shelterID);
            break;
        case 'Admin':
            response = await fetch(baseUrl + '/admin/' + iD);
            break;
        default:
            // Handle unknown role
            displayBlankInfoColumn();
            return;
    }
    const user = await response.json();
    console.log(user);
    if (user) {
        displayUserInfo(user, role);
    } else {
        // No user found with the given role ID
        displayBlankInfoColumn();
    }
}

function displayUserInfo(user, role) {
    let html;
    switch (role) {
        case 'User':
            html = getUserHtml(user);
            break;
        case 'Shelter':
            html = getShelterHtml(user);
            break;
        case 'Admin':
            html = getAdminHtml(user);
            break;
        default:
            html = '';
            break;
    }

    document.getElementById('userTableContainer').innerHTML = html;
}

function getUserHtml(user) {
    // Generate HTML for user role
    return `
    <table id="userTable">
                 <tr>
                     <th>Account Info</th>
                     <th></th>
                 </tr>
                 <tr>
                     <td>First Name:</td>
                     <td><span id="firstName">${user.firstName}</span></td>
                 </tr>
                 <tr>
                     <td>Last Name:</td>
                     <td><span id="lastName">${user.lastName}</span></td>
                 </tr>
                 <tr>
                     <td>Email:</td>
                     <td><span id="email">${user.email}</span></td>
                 </tr>
                 <tr>
                     <td>Phone:</td>
                     <td><span id="phoneNumber">${user.phoneNumber}</span></td>
                 </tr>
                 <tr>
                     <td>Zip/Postal Code:</td>
                     <td><span id="zipCode">${user.zipCode}</span></td>
                 </tr>
                 <tr>
                     <td>Password:</td>
                     <td><span id="password">${user.password}</span></td>
                 </tr>
                 <tr>
                     <td colspan="2">
                         <button class="btn btn-primary" onclick="toggleEdit()">Edit</button>
                         <button class="btn btn-primary" onclick="saveChanges('${user.userID}')">Save</button>
                     </td>
                  </tr>
             </table>`;
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
        <td><span id="shelterName">${user.shelter_Name}</span></td>
    </tr>
    <tr>
        <td>Email:</td>
        <td><span id="email">${user.email}</span></td>
    </tr>
    <tr>
        <td>Phone:</td>
        <td><span id="phoneNumber">${user.phone_Number}</span></td>
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
        <td>Password:</td>
        <td><span id="password">${user.password}</span></td>
    </tr>
    <tr>
        <td colspan="2">
            <button class="btn btn-primary" onclick="toggleEdit('${user.role}')">Edit</button>
            <button class="btn btn-primary" onclick="saveChanges('${user.shelterID}')">Save</button>
        </td>
     </tr>
</table>`;
}

function getAdminHtml(user) {
    // Generate HTML for admin role
    return `
    <table id="adminTable">
    <tr>
        <th>Account Info</th>
        <th></th>
    </tr>
    <tr>
        <td>First Name:</td>
        <td><span id="firstName">${user.firstName}</span></td>
    </tr>
    <tr>
        <td>Last Name:</td>
        <td><span id="lastName">${user.lastName}</span></td>
    </tr>
    <tr>
        <td>Email:</td>
        <td><span id="email">${user.email}</span></td>
    </tr>
    <tr>
        <td>Password:</td>
        <td><span id="password">${user.password}</span></td>
    </tr>
    <tr>
        <td colspan="2">
            <button class="btn btn-primary" onclick="toggleEdit('${user.role}')">Edit</button>
            <button class="btn btn-primary" onclick="saveChanges('${user.iD}')">Save</button>
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
                <td colspan="2">No user information available.</td>
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

// function toggleEdit(role) {
//     console.log('hello')
//     const tableId = getTableIdByRole(role);
//     console.log(tableId)
//     const cells = document.querySelectorAll(`#${tableId} span`);
//     console.log(cells)
//     cells.forEach(function(cell) {
//         const input = document.createElement('input');
//         input.value = cell.innerText;
//         cell.innerHTML = '';
//         cell.appendChild(input);
//     });
// }

function toggleEdit(role) {
    console.log('Role:', role); // Log the role
    const tableId = getTableIdByRole(role);
    console.log('Table ID:', tableId); // Log the tableId
    const cells = document.querySelectorAll(`#${tableId} span`);
    console.log('Cells:', cells); // Log the cells
    cells.forEach(function(cell) {
        const input = document.createElement('input');
        input.value = cell.innerText;
        cell.innerHTML = '';
        cell.appendChild(input);
    });
}


// function toggleEdit(role) {
//     console.log('hello');
//     const tableId = getTableIdByRole(role);
//     console.log(tableId);
//     const cells = document.querySelectorAll(`#${tableId} span`);
//     console.log(cells);
//     cells.forEach(function(cell) {
//         const input = document.createElement('input');
//         input.value = cell.innerText;
//         cell.innerHTML = '';
//         cell.appendChild(input);
//     });
// }


function getTableIdByRole(role) {
    switch (role) {
        case 'User':
            return 'userTable';
        case 'Shelter':
            return 'shelterTable';
        case 'Admin':
            return 'adminTable';
        default:
            return '';
    }
}

async function saveUserChanges(userID) {
    const cells = document.querySelectorAll('#userTable span');
    const user = getUserDataFromCells(cells);
    await updateUser(user, userID);
}

async function saveShelterChanges(shelterID) {
    const cells = document.querySelectorAll('#shelterTable span');
    const shelter = getShelterDataFromCells(cells);
    await updateShelter(shelter, shelterID);
}

async function saveAdminChanges(iD) {
    const cells = document.querySelectorAll('#adminTable span');
    const admin = getAdminDataFromCells(cells);
    await updateAdmin(admin, iD);
}

function getUserDataFromCells() {
    // Extract data from cells for user table
    // Example:
    return {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        zipCode: document.getElementById('zipCode').value,
        phoneNumber: document.getElementById('phoneNumber').value
    };
}

function getShelterDataFromCells() {
    // Extract data from cells for shelter table
    // Example:
    return {
        // Different fields for shelter
        password: document.getElementById('password').value,
        addressLine: document.getElementById('addressLine').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zipCode').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        shelterName: document.getElementById('shelterName').value
    };
}

function getAdminDataFromCells() {
    // Extract data from cells for admin table
    // Example:
    return {
        // Different fields for admin
        email: document.getElementById('email').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        password: document.getElementById('password').value,
    };
}

async function updateUser(user, userID) {
    await fetch(baseUrl + '/user/' + userID, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

async function updateShelter(shelter, shelterID) {
    await fetch(baseUrl + '/shelters/' + shelterID, {
        method: "PUT",
        body: JSON.stringify(shelter),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}
async function updateAdmin(admin, iD) {
    await fetch(baseUrl + '/admin/' + iD, {
        method: "PUT",
        body: JSON.stringify(admin),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}