//const userUrl = "http://localhost:5016/api/user"

//just for testing
// const users = [
//     { firstName: 'John', lastName: 'Doe', userEmail: 'john@example.com', phoneNumber: '1234567890', userZip: '12345', userPassword: 'password' }
// ]

function handleOnLoad(){
    populateTable()
}

// //function to see who is logged in and retrieve their data


async function populateTable() {
    await getAllUsers()
    let html = `
        <table id="userTable">
            <tr>
                <th>Account Info</th>
                <th></th>
            </tr>`;

    users.forEach(function(user) {
        html += `
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
                <td><span id="phone">${user.phoneNumber}</span></td>
            </tr>
            <tr>
                <td>Zip/Postal Code:</td>
                <td><span id="zip">${user.zipCode}</span></td>
            </tr>
            <tr>
                <td>Password:</td>
                <td><span id="password">${user.password}</span></td>
            </tr>
            <tr>
                <td colspan="2">
                    <button class="btn btn-primary" onclick="toggleEdit()">Edit</button>
                    <button class="btn btn-primary" onclick="saveChanges('${user.userId}')">Save</button>
                </td>
            </tr>`;
    });

    html += `
        </table>`;

    document.getElementById('userTableContainer').innerHTML = html;
}

function toggleEdit() {
    const cells = document.querySelectorAll('#userTable span');
    cells.forEach(function(cell) {
        const input = document.createElement('input');
        input.value = cell.innerText;
        cell.innerHTML = '';
        cell.appendChild(input);
    });
}

async function saveChanges(userId) {
    const cells = document.querySelectorAll('#userTable span');
    cells.forEach(function(cell) {
        const input = cell.querySelector('input');
        if (input) {
            cell.innerText = input.value;
        } else {
            console.error('No input element found in cell:', cell);
        }
    });
    // const cells = document.querySelectorAll('#userTable span');
    // cells.forEach(function(cell) {
    //     const input = cell.querySelector('input');
    //     if (input) {
    //         cell.innerText = input.value;
    //     }
    // });
    let user = {
        userId: userId,
        email: document.getElementById('email').value,
        passwordHash: document.getElementById('password'),
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        zipCode: document.getElementById('zipCode').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        favoritePets: favoritePets,
        role: role
    }

    await fetch(userUrl + '/' + user.userId,{
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    })
    // Send the updated data to the server for saving
    // You can implement the fetch call to update the database here
    // Example:
    // fetch('/updateUser', {
    //     method: 'POST',
    //     body: JSON.stringify(userData),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(response => {
    //     // Handle response
    // }).catch(error => {
    //     // Handle error
    // });
}

async function getAllUsers() {
    // Perform asynchronous data retrieval (e.g., fetch API call)
    // Assign the fetched data to the users variable
    // Example:
    const response = await fetch(userUrl);
    users = await response.json();
    // For demonstration purposes, a mock array of users is used
    // users = [
    //     { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    //     { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
    // ];
}

// async function handleUpdateUser(id){
//     let user = {
//         id: id,
//         fullName: document.getElementById('fullName').value,
//         email: document.getElementById('userEmail').value,
//         phone: document.getElementById('userPhone').value,
//         zip: document.getElementById('userZip').value,
//         password: document.getElementById('userPassword').value

//     }
//     await fetch(userUrl + '/' + user.id,{
//         method: "PUT",
//         body: JSON.stringify(user),
//         headers: {
//             "Content-type" : "application/json; charset=UTF-8"
//         }
//     })
//     handleOnLoad()
// }