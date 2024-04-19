const petUrl = "http://localhost:5016/api/pets"

let shelterID
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
        <div id = "petSTable"></div>
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
            <label for = "weight">Weight:</label><br>
            <select name="weight" id="weight" style="margin-bottom: 10px;">
                <option value="null">-</option>
                <option value="SMALL (2-22 lbs.)">Small (2-22 lbs.)</option>
                <option value="MEDIUM (24-57 lbs.)">Medium (24-57 lbs.)</option>
                <option value="LARGE (59-99 lbs.)">Large (59-99 lbs.)</option>
                <option value="X-LARGE (100+ lbs.)">X-Large (100+ lbs.)</option>
            </select><br>
            <label for = "height">Height:</label><br>
            <select name="height" id="height" style="margin-bottom: 10px;">
                <option value="null">-</option>
                <option value="SMALL: 12&quot; or Less">Small: 12" or Less</option>
                <option value="MEDIUM: 13&quot; to 16&quot; inches">Medium: 13" to 16" inches</option>
                <option value="LARGE: 17&quot; to 20&quot; inches">Large: 17" to 20" inches</option>
                <option value="X-LARGE: 21&quot; to 27&quot; inches">X-Large: 21" to 27" inches</option>
                <option value="XX-LARGE: 28&quot; or UP">XX-Large: 28" or UP</option>
            </select><br>
            <label>Attitude:</label><br>
                <input type="checkbox" id="attitudeAggressive" name="attitude" value="aggressive">
                <label for="attitudeAggressive">Aggressive</label>
                <input type="checkbox" id="attitudeFriendly" name="attitude" value="friendly">
                <label for="attitudeFriendly">Friendly</label>
                <input type="checkbox" id="attitudeAnxious" name="attitude" value="anxious">
                <label for="attitudeAnxious">Anxious</label>
                <input type="checkbox" id="attitudeCalm" name="attitude" value="calm">
                <label for="attitudeCalm">Calm</label>
                <input type="checkbox" id="attitudeIndependent" name="attitude" value="independent">
                <label for="attitudeIndependent">Independent</label>
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

async function populateTable() {
    await getAllPets();
    console.log(pets)
    const token = localStorage.getItem('jwt');
    const decodedToken = decodeJWT(token);
    shelterID = parseInt(decodedToken.nameid);

    const shelterPets = pets.filter(pet => pet.shelterID === shelterID);
    console.log(shelterID)
    console.log(shelterPets)
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
                <th>Delete/Adopt</th>
            </tr>`;

    // Add rows for each pet belonging to the shelter
    shelterPets.forEach(function (pet) {
        //console.log('Pet ID:', pet.petID, 'Shelter ID:', pet.shelterID);
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
    document.getElementById('petSTable').innerHTML = html;
}

async function handleAddPet() {
    // Get the current date and time
    var postDate = new Date();
    var formattedPostDate = postDate.toISOString();

    var breedValue = document.getElementById("breed").value
    var otherInput = ""
    if (breedValue === "other") {
        otherInput = document.getElementById("otherInput").value
    } else {
        otherInput = breedValue
    }

    let attitude = "";
    document.querySelectorAll('input[name="attitude"]:checked').forEach(function (checkbox, index) {
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

    // let imageFile = document.getElementById('imageUpload').files[0];
    // let imageData = await convertImageToBase64(imageFile);

    let pet = {
        name: document.getElementById('name').value,
        breed: otherInput,
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value,
        intakeDate: formattedIntakeDate,
        postDate: formattedPostDate,
        weight: document.getElementById('weight').value,
        attitude: attitude,
        aboutMe: document.getElementById('aboutMe').value,
        height: document.getElementById('height').value,
        houseTrained: document.getElementById('houseTrained').value,
        petType: document.getElementById('petType').value,
        adoptionStatus: "open",
        shelterID: shelterID,
        imagePath: "image"
    }
    console.log(pet)
    console.log(postDate)
    console.log(intakeDateStart)
    await savePet(pet)
    populateTable()
}

async function savePet(pet) {
    await fetch(petUrl, {
        method: "POST",
        body: JSON.stringify(pet),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
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


async function handlePetAdoption(petID) {
    try {
        console.log('Attempting to adopt pet with ID:', petID);

        const pet = pets.find(pet => pet.petID == petID);
        if (!pet) {
            throw new Error('Pet not found');
        }
        pet.adoptionStatus = "Adopted";
        console.log('Adoption status updated:', pet.adoptionStatus);

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
        populateTable();
    } catch (error) {
        console.error('Error:', error);
    }
}

function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

async function handlePetEdit(petID) {
    console.log(petID)
    let response = await fetch('http://localhost:5016/api/pets/' + petID)
    let pet = await response.json()
    console.log(pet)

    let html = `
    <form onsubmit = "return false">
    <h3>Edit Pet Listing</h3>
    <label for = "name">Name:</label><br>
    <input type="text" id="name" placeholder="Name" style="margin-bottom: 10px;"><br>
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
    <label for="age">Age:</label><br>
    <input type="number" id="age" placeholder="Age" style="margin-bottom: 10px;"><br>
    <label for = "gender">Gender:</label><br>
    <select name="gender" id="gender" style="margin-bottom: 10px;">
        <option value="null">-</option>
        <option value="Male">M</option>
        <option value="Female">F</option>
    </select><br>
    
    <label for = "weight">Weight:</label><br>
            <select name="weight" id="weight" style="margin-bottom: 10px;">
                <option value="null">-</option>
                <option value="SMALL (2-22 lbs.)">Small (2-22 lbs.)</option>
                <option value="MEDIUM (24-57 lbs.)">Medium (24-57 lbs.)</option>
                <option value="LARGE (59-99 lbs.)">Large (59-99 lbs.)</option>
                <option value="X-LARGE (100+ lbs.)">X-Large (100+ lbs.)</option>
            </select><br>
            <label for = "height">Height:</label><br>
            <select name="height" id="height" style="margin-bottom: 10px;">
                <option value="null">-</option>
                <option value="SMALL: 12&quot; or Less">Small: 12" or Less</option>
                <option value="MEDIUM: 13&quot; to 16&quot; inches">Medium: 13" to 16" inches</option>
                <option value="LARGE: 17&quot; to 20&quot; inches">Large: 17" to 20" inches</option>
                <option value="X-LARGE: 21&quot; to 27&quot; inches">X-Large: 21" to 27" inches</option>
                <option value="XX-LARGE: 28&quot; or UP">XX-Large: 28" or UP</option>
            </select><br>
    <label>Attitude:</label><br>
        <input type="checkbox" id="attitudeAggressive" name="attitude" value="aggressive">
        <label for="attitudeAggressive">Aggressive</label>
        <input type="checkbox" id="attitudeFriendly" name="attitude" value="friendly">
        <label for="attitudeFriendly">Friendly</label>
        <input type="checkbox" id="attitudeAnxious" name="attitude" value="anxious">
        <label for="attitudeAnxious">Anxious</label>
        <input type="checkbox" id="attitudeCalm" name="attitude" value="calm">
        <label for="attitudeCalm">Calm</label>
        <input type="checkbox" id="attitudeIndependent" name="attitude" value="independent">
        <label for="attitudeIndependent">Independent</label>
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
        <option value="available">available</option>
        <option value="pending">pending</option>
    </select><br>
    <label for="imageUpload" style="margin-top: 10px;">Upload Image:</label>
    <input type="file" id="imageUpload" accept="image/*" style="margin-top: 10px;">
    <div id="imagePreview" style="margin-top: 10px;"></div>
    <button style="margin-top: 10px;" class="btn btn-primary" onclick="handleUpdatePet('${petID}')">Update</button> 
</form>
    `
    console.log(petID)
    document.getElementById('app').innerHTML = html
    document.getElementById('name').value = pet.name
    document.getElementById('breed').value = pet.breed
    document.getElementById('age').value = pet.age
    document.getElementById('gender').value = pet.gender
    document.getElementById('weight').value = pet.weight
    document.getElementById('height').value = pet.height
    document.getElementById('aboutMe').value = pet.aboutMe
    document.getElementById('adoptionStatus').value = pet.adoptionStatus
    document.getElementById('houseTrained').value = pet.houseTrained

    const breedSelect = document.getElementById('breed');
    breedSelect.value = pet.breed;
    handleChange(breedSelect);

    let attitude = "";
    document.querySelectorAll('input[name="attitude"]:checked').forEach(function (checkbox, index) {
        if (index > 0) {
            attitude += ";";
        }
        attitude += checkbox.value;
    });
    
}

async function handleUpdatePet(petID) {
    let response = await fetch('http://localhost:5016/api/pets/' + petID)
    let originalPet = await response.json();

    // Extract values from the original pet object
    let intakeDate = originalPet.intakeDate;
    let postDate = originalPet.postDate;
    let shelterID = originalPet.shelterID;
    let petType = originalPet.petType
    let imagePath = originalPet.imagePath

    var breedValue = document.getElementById("breed").value
    var otherInput = ""
    if (breedValue === "other") {
        otherInput = document.getElementById("otherInput").value
    } else {
        otherInput = breedValue
    }

    let attitude = "";
    document.querySelectorAll('input[name="attitude"]:checked').forEach(function (checkbox, index) {
        // If this is not the first checkbox, add a ";" before adding the value
        if (index > 0) {
            attitude += ";";
        }
        attitude += checkbox.value;
    });

    let pet = {
        petID: petID, 
        name: document.getElementById('name').value, 
        breed: otherInput, 
        age :document.getElementById('age').value,
        gender :document.getElementById('gender').value,
        intakeDate :intakeDate,
        postDate: postDate,
        weight: document.getElementById('weight').value,
        attitude: attitude,
        aboutMe: document.getElementById('aboutMe').value,
        height: document.getElementById('height').value,
        houseTrained: document.getElementById('houseTrained').value,
        petType: petType,
        adoptionStatus: document.getElementById('adoptionStatus').value,
        shelterID: shelterID,
        imagePath: imagePath
    }
    console.log(pet)
    await fetch(petUrl + '/' + pet.petID, {
        method: "PUT",
        body: JSON.stringify(pet),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
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
