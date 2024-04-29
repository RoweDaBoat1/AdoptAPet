const baseUrl = "http://localhost:5016/api"

let userID

function handleOnLoad() {
    const token = localStorage.getItem('jwt');
    if (token) {
        const decodedToken = decodeJWT(token);
        console.log(decodedToken)
        let userID = decodedToken.nameid
        getUserInfo(userID);
    } else {
        displayBlankInfoColumn();
    }
}

async function getUserInfo(userID) {
    let response = await fetch(baseUrl + '/user/' + userID);
    const user = await response.json();
    console.log(user);
    if (user) {
        displayUserInfo(user);
    } else {
        displayBlankInfoColumn();
    }
}

function displayUserInfo(user) {
    let html = getUserHtml(user)
    document.getElementById('userTableContainer').innerHTML = html;
}


function getUserHtml(user) {
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
                     <td colspan="2">
                         <button class="btn btn-primary" onclick="toggleEdit()">Edit</button>
                         <button class="btn btn-primary" onclick="saveChanges('${user.userID}')">Save</button>
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
    const cells = document.querySelectorAll(`#userTable span`);
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

function saveChanges(userID) {
    const cells = document.querySelectorAll(`#userTable span`);
    let updatedUser = {};
    cells.forEach(function(cell) {
        const fieldName = cell.id;
        const input = cell.querySelector('input');
        const value = input.value;
        updatedUser[fieldName] = value;
        const span = document.createElement('span');
        span.textContent = value;
        cell.innerHTML = '';
        cell.appendChild(span);
    });
    updateUser(userID, updatedUser);
}

async function updateUser(userID, updatedUser) {
    let response = await fetch('http://localhost:5016/api/user/' + userID)
    let originalUser = await response.json();

    // Extract values from the original pet object
    let passwordHash = originalUser.passwordHash
    let salt = originalUser.salt
    // let favoritePets = originalUser.favoritePets
    let role = originalUser.role

    let email= updatedUser.email
    let firstName = updatedUser.firstName
    let lastName = updatedUser.lastName
    let zipCode = updatedUser.zipCode
    let phoneNumber = updatedUser.phoneNumber


    let user = {
        userID: userID,
        email: email,
        passwordHash: passwordHash,
        salt: salt,
        firstName: firstName,
        lastName: lastName,
        zipCode: zipCode,
        phoneNumber: phoneNumber,
        // favoritePets: favoritePets,
        role: role
    }
    console.log(user)
    await fetch(baseUrl + '/user/' + userID, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}