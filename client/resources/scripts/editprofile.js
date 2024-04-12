//const userUrl = "http://localhost:5016/api/users"

//just for testing
const users = [
    { fullName: 'John Doe', userEmail: 'john@example.com', phoneNumber: '1234567890', userZip: '12345', userPassword: 'password' }
]

function handleOnLoad(){
    populateTable(users)
}

// //function to see who is logged in and retrieve their data


function populateTable(users) {
    let html = `
        <table id="userTable">
            <tr>
                <th>Account Info</th>
                <th></th>
            </tr>`;

    users.forEach(function(user) {
        html += `
            <tr>
                <td>First and Last Name:</td>
                <td><span id="fullName">${user.fullName}</span></td>
            </tr>
            <tr>
                <td>Email:</td>
                <td><span id="email">${user.userEmail}</span></td>
            </tr>
            <tr>
                <td>Phone:</td>
                <td><span id="phone">${user.phoneNumber}</span></td>
            </tr>
            <tr>
                <td>Zip/Postal Code:</td>
                <td><span id="zip">${user.userZip}</span></td>
            </tr>
            <tr>
                <td>Password:</td>
                <td><span id="password">${user.userPassword}</span></td>
            </tr>
            <tr>
                <td colspan="2">
                    <button class="btn btn-primary" onclick="toggleEdit()">Edit</button>
                    <button class="btn btn-primary" onclick="saveChanges()">Save</button>
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

async function saveChanges() {
    const cells = document.querySelectorAll('#userTable span');
    cells.forEach(function(cell) {
        const input = cell.querySelector('input');
        if (input) {
            cell.innerText = input.value;
        }
    });

    await fetch(userUrl + '/' + user.id,{
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