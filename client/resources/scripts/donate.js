// import ApiUrls from './apiUrls.js';
// const apiUrls = new ApiUrls();

const donationUrl = "http://localhost:5016/api/donations"
const shelterUrl = "http://localhost:5016/api/shelters"

// const donationUrl = apiUrls.donationUrl
// const shelterUrl = apiUrls.shelterUrl
let donations = []




function handleOnLoad(){
    populateShelterDropdown();
    let html = `
    <form onsubmit = "handleSubmit()" style="text-align: center;">
    <label for = "shelterName">Select Shelter</label><br>
    <select name="shelterName" id="shelterName">
    <option value="null">-</option>
    <option value="schc">Shelby County HC</option>
    <option value="tmac">Tuscaloosa Metro AC</option>
    <option value="more">another shelter</option>
    <option value="evenmore">and yet another</option>
    </select><br>
    <label for = "name">Full Name</label><br>
        <input type = "text" id = "name" name = "name"><br>
        <label for = "email">Email</label><br>
        <input type = "email" id = "email" name = "email"><br>
        <label for="donation">Donation Amount:</label><br>
        <select name="donation" id="donation" onchange="handleChange(donation)">
            <option value="null">-</option>
            <option value="10">$10</option>
            <option value="25">$25</option>
            <option value="50">$50</option>
            <option value="100">$100</option>
            <option value="custom">Custom</option>
            </select><br>
            <div id="customAmountInput" style="display: none;">
            <label for="customAmount">Enter custom amount:</label>
            <input type="text" id="customAmount" name="customAmount">
            </div>                    
        <label>Donate Anonymously?</label><br>
        <input type="radio" id="anonYes" name="anonymous" value="true">
        <label for="anonYes">Yes</label>
        <input type="radio" id="anonNo" name="anonymous" value="false" checked>
        <label for="anonNo">No</label><br>
        <a style="margin-top: 10px;" class="btn btn-primary" type="submit" onclick="handleButtonClick()">Proceed to Payment</a>
        </form>
        `
        document.getElementById('app').innerHTML = html
        //populateTable()
    }
        
    async function populateShelterDropdown() {
        await getAllShelters()
        let dropdown = document.getElementById('shelterName'); // Get the shelter dropdown element
        dropdown.innerHTML = ''; // Clear existing options
            
        // Iterate through the approved shelters and add them as options to the dropdown
        shelters.forEach(function(shelter) {
            if (shelter.approvalStatus == "approved") { // Check if the shelter is approved
                let option = document.createElement('option'); // Create a new option element
                option.value = shelter.shelterName; // Set the value attribute to shelter name
                option.textContent = shelter.shelterName; // Set the text content to shelter name
                dropdown.appendChild(option); // Append the option to the dropdown
            }
        });
    }

    function handleButtonClick(){
        //post function?
        console.log(hello)
        window.location.href = 'https://www.metroanimalshelter.org/donate'
    }
        
    async function getAllDonations(){
        let response = await fetch(apiUrls.donationUrl)
        donation = await response.json()
        console.log(donations)
    }

    async function getAllShelters(){
        let response = await fetch(shelterUrl)
        shelters = await response.json()
        console.log(shelters)
    }
        
    function handleChange(donation) {
        var selectedValue = donation.value
        if (selectedValue === "custom") {
            document.getElementById("customAmountInput").style.display = "block";
        } else {
            document.getElementById("customAmountInput").style.display = "none"
        }
    }
// make this table potentially on the analytics page
// async function populateTable(){
//     await getAllDonations()
//     //sortTable()
//     let html = `
//     <table class = "table table-striped">
//         <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Type</th>
//             <th>Breed</th>
//             <th>Age</th>
//             <th>Gender</th>
//             <th>Intake Date</th>
//             <th>Status</th>
//         </tr>`
//     donations.forEach(function(donation){
//         if(donation.adopted == false){
//             html+= `
//             <tr>
//                 <td>${donation.id}</td>
//                 <td>${donation.name}</td>
//                 <td>${donation.type}</td>
//                 <td>${donation.breed}</td>
//                 <td>${donation.age}</td>
//                 <td>${donation.gender}</td>
//                 <td>${donation.intakeDate}</td>
//                 <td><button class = "btn btn-danger" onclick= "handledonationAdoption('${donation.id}')">Delete</button></td>
//             </tr>
//             `
//         }
//     })
    
//     html += `
//     </table>
//     `
//     document.getElementById('donationTable').innerHTML = html
// }

async function handleAddDonation(){
    var name = document.getElementById('name').value
    var email = document.getElementById('name').value
    var isAnonymous = document.querySelector('input[name="anonymous"]:checked').value === "true"

    var donationValue = document.getElementById("donation").value
    var customAmount = ""
    if (donationValue === "custom") {
        customAmount = document.getElementById("customAmount").value
    } else {
        customAmount = donationValue
    }

    if (isAnonymous) {
        name = "null"
        email = "null"
    }
    var donationDate = new Date()
    let donation = {
        id: crypto.randomUUID(),
        shelterName: document.getElementById('shelterName').value, 
        name: name,
        email: email,
        donation: customAmount,
        donationDate: donationDate.toISOString()
    }
    await saveDonation(donation)
    //populateTable()
}

async function saveDonation(donation){
    await fetch(apiUrls.donationUrl, {
            method: "POST",
            body: JSON.stringify(donation),
            headers: {
                "Content-type" : "application/json; charset=UTF-8"
            }
    })
}

// Call populateShelterDropdown() when the donation page loads
//  window.onload = function() {
//      populateShelterDropdown();
//  };