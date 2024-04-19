const baseUrl = "http://localhost:5016/api"

let adminID

function handleOnLoad() {
    const token = localStorage.getItem('jwt');
    const decodedToken = decodeJWT(token);
    adminID = decodedToken.nameid
    console.log(adminID);
    getUserInfo(adminID)
}

async function getUserInfo(adminID) {
    let response = await fetch(baseUrl + '/admin/' + adminID);
    const user = await response.json();
    console.log(adminID)
    console.log(user);
    if (user) {
        displayAdminInfo(user);
    } else {
        displayBlankInfoColumn();
    }
}

function displayAdminInfo(user) {
    console.log(adminID)
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
        <td>Email:</td>
        <td><span id="email">${user.email}</span></td>
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
    const updatedAdmin = {};
    cells.forEach(function(cell) {
        const fieldName = cell.id;
        const input = cell.querySelector('input');
        const value = input.value;
        updatedAdmin[fieldName] = value;
        const span = document.createElement('span');
        span.textContent = value;
        cell.innerHTML = '';
        cell.appendChild(span);
    });
    updateAdmin(adminID, updatedAdmin);
}

async function updateAdmin(adminID, updatedAdmin) {
    let response = await fetch('http://localhost:5016/api/admin/' + adminID)
    let originalAdmin = await response.json();

    let passwordHash = originalAdmin.passwordHash
    let salt = originalAdmin.salt
    let role = originalAdmin.role

    let email= updatedAdmin.email
    let firstName = updatedAdmin.firstName
    let lastName = updatedAdmin.lastName

    let admin = {
        adminID: adminID,
        email: email,
        firstName: firstName,
        lastName: lastName,
        passwordHash: passwordHash,
        salt: salt,
        role: role
    }

    console.log(adminID)
    await fetch(baseUrl + '/admin/' + adminID, {
        method: "PUT",
        body: JSON.stringify(admin),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}
