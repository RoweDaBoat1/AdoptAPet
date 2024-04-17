const baseUrl = "http://localhost:5016/api"

function handleOnLoad() {
    const token = localStorage.getItem('jwt');
    const decodedToken = decodeJWT(token);
    let adminID = decodedToken.nameid
    console.log(adminID);
    getUserInfo(adminID)
}

async function getUserInfo(adminID) {
    let response = await fetch(baseUrl + '/admin/' + adminID);
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
    let html = getadminHtml(user)
    document.getElementById('userTableContainer').innerHTML = html;
}

function getadminHtml(user) {
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
        <td colspan="2">
            <button class="btn btn-primary" onclick="toggleEdit()">Edit</button>
            <button class="btn btn-primary" onclick="saveChanges('${user.adminID}')">Save</button>
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
    const cells = document.querySelectorAll(`#adminTable span`);
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

function saveChanges(adminID) {
    const cells = document.querySelectorAll(`#adminTable span`);
    const updatedData = {};
    cells.forEach(function(cell) {
        const fieldName = cell.id; // Assuming cell id matches the field name in the data
        const value = cell.querySelector('input').value;
        updatedData[fieldName] = value;
    });
    // Send updatedData to the backend to update the profile info
    updateAdmin(adminID, updatedData);
}

async function updateAdmin(adminID, updatedData) {
    await fetch(baseUrl + '/admin/' + adminID, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}
