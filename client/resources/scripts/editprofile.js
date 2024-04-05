//const userUrl = "https://localhost:5016/api/users"

// function handleOnLoad(){
//     let html = `
//     <div id= "petTable"></div>`
//     document.getElementById('app').innerHTML = html
//     populateTable()
// }

// //function to see who is logged in and retrieve their data

// function populateTable(){
// //above function
//     let html = `
//         <table>
//             <tr>
//                 <th>Account Info</th>
//                 <th></th>
//             </tr>
//             <tr>
//                 <td>First and Last Name:</td>
//                 <td id="fullName">John Doe</td>
//             </tr>
//             <tr>
//                 <td>Email</td>
//                 <td id="userEmail">johndoe@example.com</td>
//             </tr>
//             <tr>
//                 <td>Phone</td>
//                 <td id="userPhone">205-348-5656</td>
//             </tr>
//             <tr>
//                 <td>Zip/Postal Code</td>
//                 <td id="userZip">35487</td>
//             </tr>
//             <tr>
//                 <td>Password</td>
//                 <td id="userPassword">*********</td>
//             </tr>
//         </table>
//         <button onclick="handleEdit()">Edit</button>
//     `
//     document.getElementById('userTable').innerHTML = html
// }

// function handleEdit(user){
//     let html = `
//         <h1> Annes user Adoption Agency</h1>
//         <form onsubmit = "return false">
//             <label for = "data">Personal Info</label><br>
//             <input type="text" id="fullName" placeholder="First and Last Name" required><br>
//             <input type="email" id="userEmail" placeholder="Email" required><br>
//             <input type="text" id="userPhone" placeholder="Phone Number" required><br>
//             <input type="number" id="userZip" placeholder="Zip/Postal Code" required><br>
//             <label for = "password">Password</label><br>
//             <input type="password" id="userPassword" placeholder="New Password" required><br>
//             <button style = "margin-top: 10px;" class = "btn btn-primary" onclick = handleUpdateUser('${user.id}')>Update</button>    
//         </form>`
//     document.getElementById('app').innerHTML = html
//     document.getElementById('fullName').innerHTML = user.fullName
//     document.getElementById('userEmail').innerHTML = user.email
//     document.getElementById('userPhone').innerHTML = user.phone
//     document.getElementById('userZip').innerHTML = user.zip
//     document.getElementById('userPassword').innerHTML = user.password
// }

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