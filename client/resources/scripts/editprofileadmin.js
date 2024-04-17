const baseUrl = "http://localhost:5016/api"

let AdminID

function handleOnLoad() {
    const token = localStorage.getItem('jwt');
    const decodedToken = decodeJWT(token);
    AdminID = decodedToken.nameid
    console.log(AdminID);
    getUserInfo(AdminID)
}

async function getUserInfo(AdminID) {
    let response = await fetch(baseUrl + '/admin/' + AdminID);
    const user = await response.json();
    console.log(AdminID)
    console.log(user);
    if (user) {
        displayAdminInfo(user);
    } else {
        // No user found with the given role AdminID
        displayBlankInfoColumn();
    }
}

function displayAdminInfo(user) {
    console.log(AdminID)
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

function saveChanges() {
    const cells = document.querySelectorAll(`#adminTable span`);
    const updatedAdmin = {};
    cells.forEach(function(cell) {
        const fieldName = cell.id; // Assuming cell id matches the field name in the data
        const input = cell.querySelector('input');
        const value = input.value;
        updatedAdmin[fieldName] = value;
        // Replace the input field with a span containing the new value
        const span = document.createElement('span');
        span.textContent = value;
        cell.innerHTML = '';
        cell.appendChild(span);
    });
    // console.log(AdminID)
    // const cells = document.querySelectorAll(`#adminTable span`);
    // const updatedAdmin = {};
    // cells.forEach(function(cell) {
    //     const fieldName = cell.id; // Assuming cell id matches the field name in the data
    //     const value = cell.querySelector('input').value;
    //     updatedAdmin[fieldName] = value;
    // });
    // console.log(updatedAdmin)
    // console.log(AdminID)
    // Send updatedAdmin to the backend to update the profile info
    updateAdmin(AdminID, updatedAdmin);
}

async function updateAdmin(AdminID, updatedAdmin) {
    console.log(AdminID)
    await fetch(baseUrl + '/admin/' + AdminID, {
        method: "PUT",
        body: JSON.stringify(updatedAdmin),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}
