const petUrl = "http://localhost:5016/api/pets"

//const petUrl = apiUrls.petUrl

let pets = []

// const imageUpload = document.getElementById('imageUpload')
// const imagePreview = document.getElementById('imagePreview')

// imageUpload.addEventListener('change', function(){
//     const file = this.file[0]
//     if(file){
//         const reader = new FileReader();
//         reader.onload= function(){
//             const img= document.getElementById('img')
//             img.src = reader.result
//             imagePreview.innerHTML= ''
//             imagePreview.appendChild(img)
//         }
//         reader.readAsDataURL(file)
//     }
// })

// document.getElementById('imageUpload').addEventListener('change', function() {
//     const file = this.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function() {
//             const img = document.createElement('img');
//             img.src = reader.result;
//             img.style.width = '200px'; // Set image width for preview
//             const imagePreview = document.getElementById('imagePreview');
//             imagePreview.innerHTML = ''; // Clear previous preview
//             imagePreview.appendChild(img);
//         }
//         reader.readAsDataURL(file);
//     }
// });


function handleOnLoad(){
    let html = `
        <div id = "petTable"></div>
        <form onsubmit = "return false" enctype="multipart/form-data">
            <h3>Add Pet Listing</h3>
            <input type="text" id="name" placeholder="Name" required style="margin-bottom: 10px;"><br>
            <label for ="petType">Pet Type:</label><br>
            <select name="petType" id="petType" required style="margin-bottom: 10px;">
                <option value="null">-</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
            </select><br>
            <input type="number" id="age" placeholder="Age"><br>
            <label for = "breed">Breed:</label><br>
            <select name="breed" id="breed" onchange="handleChange(breed)" style="margin-bottom: 10px;">
                <option value="null">-</option>
                <option value="chocolateLab">Chocolate Lab</option>
                <option value="lab">Labrador</option>
                <option value="lakelandTerrier">Lakeland Terrier</option>
                <option value="goldendoodle">Goldendoodle</option>
                <option value="poodle">Poodle</option>
                <option value="ragdoll">Ragdoll</option>
                <option value="siberianHusky">Siberian Husky</option>
                <option value="whiteRetriever">White Retriever</option>
                <option value="other">Other</option>
            </select><br>
            <div id="otherInput" style="display: none;">
            <label for="other">Enter Breed:</label>
            <input type="text" id="other" name="other">
            </div>
            <label for = "gender">Gender:</label><br>
            <select name="gender" id="gender" style="margin-bottom: 10px;">
                <option value="null">-</option>
                <option value="male">M</option>
                <option value="female">F</option>
            </select><br>
            <label for="intakeDate">Intake Date:</label><br>
            <input type="datetime-local" id="intakeDate" style="margin-bottom: 10px;"><br>
            <input type="text" id="weight" placeholder="Weight" style="margin-bottom: 10px;"><br>
            <input type="text" id="height" placeholder="Height" style="margin-bottom: 10px;"><br>
            <label>Attitude:</label><br>
                <input type="checkbox" id="attitudeAggressive" name="attitude" value="aggressive">
                <label for="attitudeAggressive">Aggressive</label><br>
                <input type="checkbox" id="attitudeFriendly" name="attitude" value="friendly">
                <label for="attitudeFriendly">Friendly</label><br>
                <input type="checkbox" id="attitudeAnxious" name="attitude" value="anxious">
                <label for="attitudeAnxious">Anxious</label><br>
                <input type="checkbox" id="attitudeCalm" name="attitude" value="calm">
                <label for="attitudeCalm">Calm</label><br>
                <input type="checkbox" id="attitudeIndependent" name="attitude" value="independent">
                <label for="attitudeIndependent">Independent</label><br>
                <input type="checkbox" id="attitudePlayful" name="attitude" value="playful">
                <label for="attitudePlayful">Playful</label><br>
            <label for = "houseTrained">Housetrained:</label><br>
            <select name="houseTrained" id="houseTrained" style="margin-bottom: 10px;"><br>
                <option value="null">-</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select><br>
            <textarea id="aboutMe" placeholder="About" style="width:400px; height:100px"></textarea><br>
            <label for="imageUpload" style="margin-top: 10px;">Upload Image:</label>
            <input type="file" id="imageUpload" accept="image/*" style="margin-top: 10px;">
            <div id="imagePreview" style="margin-top: 10px;"></div>
            <button style="margin-top: 10px;" class="btn btn-primary" onclick="handleAddPet()">Add Pet</button> 
        </form>
    `
    document.getElementById('app').innerHTML = html
    populateTable()
}

async function getAllPets(){
    let response = await fetch(petUrl)
    pets = await response.json()
    console.log(pets)
}

function handleChange(breed) {
    var selectedValue = breed.value
    if (selectedValue === "other") {
        document.getElementById("otherInput").style.display = "block";
    } else {
        document.getElementById("otherInput").style.display = "none"
    }
}

// async function populateTable(){
//     await getAllPets()
//     //sortTable()
//     let html = `
//     <table class = "table table-striped">
//         <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Breed</th>
//             <th>Age</th>
//             <th>Gender</th>
//             <th>Intake Date</th>
//             <th>Post Date</th>
//             <th>Weight</th>
//             <th>Attitude</th>
//             <th>About</th>
//             <th>Height</th>
//             <th>House Trained</th>
//             <th>Type</th>
//             <th>Adoption Status</th>
//             <th>Edit</th>
//             <th>Delete</th>
//         </tr>`
//     pets.forEach(function(pet){
//         //add more logic into the if statement (shelterid) so that shelters only see their own animals
//         if(pet.adoptionStatus != "Adopted"){
//             html+= `
//             <tr>
//                 <td>${pet.petID}</td>
//                 <td>${pet.name}</td>
//                 <td>${pet.breed}</td>
//                 <td>${pet.age}</td>
//                 <td>${pet.gender}</td>
//                 <td>${pet.intakeDate}</td>
//                 <td>${pet.postDate}</td>
//                 <td>${pet.weight}</td>
//                 <td>${pet.attitude}</td>
//                 <td>${pet.aboutMe}</td>
//                 <td>${pet.height}</td>
//                 <td>${pet.houseTrained}</td>
//                 <td>${pet.petType}</td>
//                 <td>${pet.adoptionStatus}</td>
//                 <td><button class = "btn btn-warning" onclick= "handlePetEdit('${pet.petID}')">Edit</button></td>
//                 <td><button class = "btn btn-danger" onclick= "handlePetAdoption('${pet.petID}')">Delete</button></td>
//             </tr>
//             `
//         }
//     })
    
//     html += `
//     </table>
//     `
//     document.getElementById('petTable').innerHTML = html
// }

async function populateTable() {
    // Fetch all pets
    await getAllPets();

    // Parse JWT token to extract shelterID
    const jwtToken = localStorage.getItem('jwtToken');
    const decodedToken = parseJWTToken(jwtToken);
    const shelterID = decodedToken.nameid;

    // Filter pets array based on shelterID
    const shelterPets = pets.filter(pet => pet.shelterID === shelterID);

    // Generate HTML for the table
    let html = `
        <table class="table table-striped">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Intake Date</th>
                <th>Post Date</th>
                <th>Weight</th>
                <th>Attitude</th>
                <th>About</th>
                <th>Height</th>
                <th>House Trained</th>
                <th>Type</th>
                <th>Adoption Status</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>`;

    // Add rows for each pet belonging to the shelter
    shelterPets.forEach(function (pet) {
        if (pet.adoptionStatus != "Adopted") {
            html += `
                <tr>
                    <td>${pet.petID}</td>
                    <td>${pet.name}</td>
                    <td>${pet.breed}</td>
                    <td>${pet.age}</td>
                    <td>${pet.gender}</td>
                    <td>${pet.intakeDate}</td>
                    <td>${pet.postDate}</td>
                    <td>${pet.weight}</td>
                    <td>${pet.attitude}</td>
                    <td>${pet.aboutMe}</td>
                    <td>${pet.height}</td>
                    <td>${pet.houseTrained}</td>
                    <td>${pet.petType}</td>
                    <td>${pet.adoptionStatus}</td>
                    <td><button class="btn btn-warning" onclick="handlePetEdit('${pet.petID}')">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="handlePetAdoption('${pet.petID}')">Delete</button></td>
                </tr>`;
        }
    });

    html += `</table>`;

    // Update the pet table with the generated HTML
    document.getElementById('petTable').innerHTML = html;
}


async function handleAddPet(){
    const token = localStorage.getItem('jwt');
    const decodedToken = decodeJWT(token);
    const shelterID = decodedToken.nameid;

    // Get the current date and time
    var postDate = new Date();

    // Convert intakeDateStart to ISO 8601 format with timezone offset
    var formattedPostDate = postDate.toISOString();

    // // Get the individual components of the date and time
    // var year = currentDate.getFullYear();
    // var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero-based, so we add 1
    // var day = ('0' + currentDate.getDate()).slice(-2);
    // var hours = ('0' + currentDate.getHours()).slice(-2);
    // var minutes = ('0' + currentDate.getMinutes()).slice(-2);
    // var seconds = ('0' + currentDate.getSeconds()).slice(-2);

    // // Construct the formatted date string
    // var postDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;


    var breedValue = document.getElementById("breed").value
    var otherInput = ""
    if (breedValue === "other") {
        otherInput = document.getElementById("otherInput").value
    } else {
        otherInput = breedValue
    }

    let attitude = "";
    document.querySelectorAll('input[name="attitude"]:checked').forEach(function(checkbox, index) {
        // If this is not the first checkbox, add a ";" before adding the value
        if (index > 0) {
            attitude += ";";
        }
        attitude += checkbox.value;
    });
    

    var intakeDateElement = document.getElementById('intakeDate');
    var intakeDateValue = intakeDateElement.value;
    
    // Extract individual components of the date and time
    var intakeDateStart = new Date(intakeDateValue);
    
    // Convert intakeDateStart to ISO 8601 format with timezone offset
    var formattedIntakeDate = intakeDateStart.toISOString();
    
    // var intakeYear = intakeDateStart.getFullYear();
    // var intakeMonth = ('0' + (intakeDateStart.getMonth() + 1)).slice(-2); // Months are zero-based, so we add 1
    // var intakeDay = ('0' + intakeDateStart.getDate()).slice(-2);
    // var intakeHours = ('0' + intakeDateStart.getHours()).slice(-2);
    // var intakeMinutes = ('0' + intakeDateStart.getMinutes()).slice(-2);
    // var intakeSeconds = ('0' + intakeDateStart.getSeconds()).slice(-2);

    // // Construct the formatted intake date string
    // var formattedIntakeDate = intakeYear + '-' + intakeMonth + '-' + intakeDay + ' ' + intakeHours + ':' + intakeMinutes + ':' + intakeSeconds;

    // console.log(formattedIntakeDate); // Check the formatted intake date


    // let imageFile = document.getElementById('imageUpload').files[0];
    // let imageData = await convertImageToBase64(imageFile);

    let pet = {
        // petId: crypto.randomUUID(), 
        name: document.getElementById('name').value, 
        breed: otherInput, 
        age: parseInt(document.getElementById('age').value),
        gender :document.getElementById('gender').value,
        intakeDate : formattedIntakeDate,
        postDate: formattedPostDate,
        weight: document.getElementById('weight').value,
        attitude: attitude,
        aboutMe :document.getElementById('aboutMe').value,
        height :document.getElementById('height').value,
        houseTrained :document.getElementById('houseTrained').value,
        petType: document.getElementById('petType').value,
        adoptionStatus: "open",
        shelterID: shelterID,
        imageData: imageData // Include image data in the pet object

        //imageUrl: imageUrl

        //shelter id
    }

    console.log(postDate)
    console.log(intakeDateStart)
    await savePet(pet)
    populateTable()
}

function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

async function savePet(pet){
    await fetch(petUrl, {
            method: "POST",
            body: JSON.stringify(pet),
            headers: {
                "Content-type" : "application/json; charset=UTF-8"
            }
    })
}

// async function uploadImage(imageFile) {
//     let formData = new FormData()
//     formData.append('image', imageFile)

//     let response = await fetch('/upload/image', {
//         method: 'POST',
//         body: formData
//     })

//     let imageUrl = await response.text()
    
//     return imageUrl
// }

// async function handlePetDelete(id){
//     pets.forEach(pet =>{
//         if(pet.id == id){
//             pet.deleted = !pet.deleted
//         }
//     })
//     await fetch(petUrl + '/' +id,{
//         method: "DELETE",
//         headers: {
//             "Content-type" : "application/json; charset=UTF-8"
//         }
//     })
//     populateTable()
// }


async function handlePetAdoption(petID) {
    try {
        console.log('Attempting to adopt pet with ID:', petID);

        // Find the pet with the specified ID
        const pet = pets.find(pet => pet.petID == petID);
        if (!pet) {
            throw new Error('Pet not found');
        }

        // Update the adoption status
        pet.adoptionStatus = "Adopted";
        console.log('Adoption status updated:', pet.adoptionStatus);

        // Send the updated pet data to the backend
        const response = await fetch(petUrl + '/' + petID, {
            method: "PUT",
            body: JSON.stringify(pet),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (!response.ok) {
            throw new Error('Failed to update pet adoption status');
        }

        // Refresh the table
        populateTable();
    } catch (error) {
        console.error('Error:', error);
        // Handle the error (e.g., display an error message to the user)
    }
}



function handlePetEdit(pet){
    let html = `
    <form onsubmit = "return false">
    <h3>Edit Pet Listing</h3>
    <input type="text" id="name" placeholder="Name" style="margin-bottom: 10px;"><br>
    <label for = "petType">Pet Type:</label><br>
    <select name="petType" id="petType" style="margin-bottom: 10px;">
        <option value="null">-</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
    </select><br>
    <input type="text" id="breed" placeholder="Breed" style="margin-bottom: 10px;"><br>
    <input type="number" id="age" placeholder="Age" style="margin-bottom: 10px;"><br>
    <label for = "gender">Gender:</label><br>
    <select name="type" id="type" style="margin-bottom: 10px;">
        <option value="null">-</option>
        <option value="male">M</option>
        <option value="female">F</option>
    </select><br>
    <label for = "intakeDate">Intake Date:</label><br>
    <input type="date" id="intakeDate" placeholder="Intake Date" style="margin-bottom: 10px;"><br>
    <input type="text" id="weight" placeholder="Weight" style="margin-bottom: 10px;"><br>
    <input type="text" id="height" placeholder="Height" style="margin-bottom: 10px;"><br>
    <label>Attitude:</label><br>
        <input type="checkbox" id="attitudeAggressive" name="attitude" value="aggressive">
        <label for="attitudeAggressive">Aggressive</label><br>
        <input type="checkbox" id="attitudeFriendly" name="attitude" value="friendly">
        <label for="attitudeFriendly">Friendly</label><br>
        <input type="checkbox" id="attitudeAnxious" name="attitude" value="anxious">
        <label for="attitudeAnxious">Anxious</label><br>
        <input type="checkbox" id="attitudeCalm" name="attitude" value="calm">
        <label for="attitudeCalm">Calm</label><br>
        <input type="checkbox" id="attitudeIndependent" name="attitude" value="independent">
        <label for="attitudeIndependent">Independent</label><br>
        <input type="checkbox" id="attitudePlayful" name="attitude" value="playful">
        <label for="attitudePlayful">Playful</label><br>
    <label for = "houseTrained">Housetrained:</label><br>
    <select name="houseTrained" id="houseTrained" style="margin-bottom: 10px;"><br>
        <option value="null">-</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
    </select><br>
    <textarea id="aboutMe" placeholder="About" style="width:400px; height:100px"></textarea><br>
    <label for = "adoptionStatus">Adoption Status:</label><br>
    <select name="adoptionStatus" id="adoptionStatus" style="margin-bottom: 10px;><br>
        <option value="open">open</option>
        <option value="pending">pending</option>
        <option value="adopted">adopted</option>
    </select><br>
    <label for="imageUpload" style="margin-top: 10px;">Upload Image:</label>
    <input type="file" id="imageUpload" accept="image/*" style="margin-top: 10px;">
    <div id="imagePreview" style="margin-top: 10px;"></div>
    <button style="margin-top: 10px;" class="btn btn-primary" onclick="handleUpdatePet('${pet.petID}')">Update</button> 
</form>
    `
    document.getElementById('app').innerHTML = html
    document.getElementById('name').value = pet.name
    document.getElementById('breed').value = pet.breed
    document.getElementById('age').value = pet.age
    document.getElementById('gender').value = pet.gender
    document.getElementById('intakeDate').value = pet.intakeDate
    document.getElementById('weight').value = pet.weight
    document.getElementById('aboutMe').value = pet.aboutMe
    document.getElementById('adoptionStatus').value = pet.adoptionStatus
    document.getElementById('height').value = pet.height
    document.getElementById('houseTrained').value = pet.houseTrained
    document.getElementById('petType').value = pet.petType

    const breedSelect = document.getElementById('breed');
    breedSelect.value = pet.breed;
    handleChange(breedSelect);

    pet.attitude.forEach(function(attitude) {
        document.getElementById('attitude' + attitude.charAt(0).toUpperCase() + attitude.slice(1)).checked = true
    })
}

async function handleUpdatePet(petID){
    let attitude = []
    document.querySelectorAll('input[name="attitude"]:checked').forEach(function(checkbox) {
        attitude.push(checkbox.value)
    })
    let pet = {
        petID: petID, 
        name: document.getElementById('name').value, 
        breed: document.getElementById('breed').value, 
        age :document.getElementById('age').value,
        gender :document.getElementById('gender').value,
        intakeDate :document.getElementById('intakeDate').value,
        postDate: postDate.toISOString(),
        weight: document.getElementById('weight').value,
        attitude: attitude,
        aboutMe :document.getElementById('aboutMe').value,
        adopted: adopted,
        adoptionStatus: document.getElementById('adoptionStatus').value,
        height :document.getElementById('height').value,
        houseTrained :document.getElementById('houseTrained').value,
        petType: document.getElementById('petType').value,
    }
    await fetch(petUrl + '/' + pet.petID,{
        method: "PUT",
        body: JSON.stringify(pet),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    })
    handleOnLoad()
}

// function convertImageToBase64(imageFile) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//         reader.readAsDataURL(imageFile);
//     });
// }
