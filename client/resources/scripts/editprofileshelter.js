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
        displayBlankInfoColumn();
    }
}

function displayUserInfo(user) {
    console.log(shelterID)
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
            <button class="btn btn-primary" onclick="saveChanges('${user.shelterID}')">Save</button>
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



function saveChanges(shelterID) {
    const cells = document.querySelectorAll(`#shelterTable span`);
    const updatedShelter = {};
    cells.forEach(function(cell) {
        const fieldName = cell.id;
        const input = cell.querySelector('input');
        const value = input.value;
        updatedShelter[fieldName] = value;
        const span = document.createElement('span');
        span.textContent = value;
        cell.innerHTML = '';
        cell.appendChild(span);
    });

    updateShelter(shelterID, updatedShelter);
}

async function updateShelter(shelterID, updatedShelter) {
    let response = await fetch('http://localhost:5016/api/shelters/' + shelterID)
    let originalShelter = await response.json();
    console.log(originalShelter)
    // Extract values from the original pet object
    let passwordHash = originalShelter.passwordHash
    let salt = originalShelter.salt
    let approval_Status = originalShelter.approval_Status
    let role = originalShelter.role

    let addressLine = updatedShelter.addressLine
    let city = updatedShelter.city
    let state = updatedShelter.state
    let zipCode = updatedShelter.zipCode
    let phone_Number = updatedShelter.phone_Number
    let email= updatedShelter.email
    let shelter_Name = updatedShelter.shelter_Name

    let shelter = {
        shelterID: shelterID,
        passwordHash: passwordHash,
        salt: salt,
        addressLine: addressLine,
        city: city,
        state: state,
        zipCode: zipCode,
        phone_Number: phone_Number,
        email: email,
        shelter_Name: shelter_Name,
        role: role,
        approval_Status: approval_Status
    }
    console.log(shelter)
    await fetch(baseUrl + '/shelters/' + shelterID, {
        method: "PUT",
        body: JSON.stringify(shelter),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}