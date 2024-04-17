// import ApiUrls from './apiUrls.js';
// const apiUrls = new ApiUrls();

const donationUrl = "http://localhost:5016/api/donation"
const shelterUrl = "http://localhost:5016/api/shelters"

// const donationUrl = apiUrls.donationUrl
// const shelterUrl = apiUrls.shelterUrl
let donations = []


function handleAnLoad(){
    populateDonationTable()
}

function handleOnLoad(){
    populateShelterDropdown();
    let html = `
    <form onsubmit = "handleSubmit()" style="text-align: center;">
    <label for = "shelterName">Select Shelter:</label><br>
    <select name="shelterName" id="shelterName" style="margin-bottom: 10px;">
    <option value="null">-</option>
    <option value="schc">Shelby County HC</option>
    <option value="tmac">Tuscaloosa Metro AC</option>
    <option value="more">another shelter</option>
    <option value="evenmore">and yet another</option>
    </select><br>
    <input type="text" id="firstName" placeholder="First Name" style="margin-bottom: 10px;"><br>
    <input type="text" id="lastName" placeholder="Last Name" style="margin-bottom: 10px;"><br>
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
            if (shelter.approval_Status == "Approved") { // Check if the shelter is approved
                let option = document.createElement('option'); // Create a new option element
                option.value = shelter.shelter_Name; // Set the value attribute to shelter name
                option.textContent = shelter.shelter_Name; // Set the text content to shelter name
                dropdown.appendChild(option); // Append the option to the dropdown
            }
        });
    }

    async function handleButtonClick(){
        await handleAddDonation()
        console.log('hello')
        window.location.href = 'donationimage.html'
    }
        
    async function getAllDonations(){
        let response = await fetch(donationUrl)
        donations = await response.json()
        console.log(donations)
    }

    async function getAllShelters(){
        let response = await fetch(shelterUrl)
        shelters = await response.json()
        //console.log(shelters)
    }
        
    function handleChange(donation) {
        var selectedValue = donation.value
        if (selectedValue === "custom") {
            document.getElementById("customAmountInput").style.display = "block";
        } else {
            document.getElementById("customAmountInput").style.display = "none"
        }
    }
async function populateDonationTable(){
    await getAllDonations()
    //sortTable()
    let html = `
    <table class = "table table-striped">
        <tr>
            <th>Donation ID</th>
            <th>Amount</th>
            <th>Shelter Name</th>
            <th>Donation Date</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
       
        </tr>`
    donations.forEach(function(donation){
      
            html+= `
            <tr>
                <td>${donation.donationID}</td>
                <td>${donation.amount}</td>
                <td>${donation.shelterName}</td>
                <td>${donation.donationDate}</td>
                <td>${donation.email}</td>
                <td>${donation.firstName}</td>
                <td>${donation.lastName}</td>
            </tr>
            `
        
    })
    
    html += `
    </table>
    `
    document.getElementById('donationTable').innerHTML = html
}

async function handleAddDonation(){
    var firstName = document.getElementById('firstName').value
    var lastName = document.getElementById('lastName').value
    var email = document.getElementById('email').value
    var isAnonymous = document.querySelector('input[name="anonymous"]:checked').value === "true"

    var donationValue = document.getElementById("donation").value
    var customAmount = ""
    if (donationValue === "custom") {
        customAmount = document.getElementById("customAmount").value
    } else {
        customAmount = donationValue
    }

    if (isAnonymous) {
        firstName = "null"
        lastName = "null"
        email = "null"
    }
    // var donationDate = new Date()
    let donation = {
        amount: customAmount,
        // donationDate: donationDate.toISOString(),
        shelterName: document.getElementById('shelterName').value, 
        email: email,
        firstName: firstName,
        lastName: lastName
    }
    await saveDonation(donation)
    //populateTable()
}

async function saveDonation(donation){
    await fetch(donationUrl, {
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