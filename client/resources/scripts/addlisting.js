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
            <label for = "intakeDate">Intake Date:</label><br>
            <input type="text" id="intakeDate" placeholder="mm/dd/yyyy" style="margin-bottom: 10px;"><br>
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

async function populateTable(){
    await getAllPets()
    //sortTable()
    let html = `
    <table class = "table table-striped">
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
        </tr>`
    pets.forEach(function(pet){
        //add more logic into the if statement (shelterid) so that shelters only see their own animals
        if(pet.adoptionStatus != "adopted"){
            html+= `
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
                <td><button class = "btn btn-warning" onclick= "handlePetEdit('${pet.petID}')">Edit</button></td>
                <td><button class = "btn btn-danger" onclick= "handlePetAdoption('${pet.petID}')">Delete</button></td>
            </tr>
            `
        }
    })
    
    html += `
    </table>
    `
    document.getElementById('petTable').innerHTML = html
}

async function handleAddPet(){
    var postDate = new Date()

    var breedValue = document.getElementById("breed").value
    var otherInput = ""
    if (breedValue === "other") {
        otherInput = document.getElementById("otherInput").value
    } else {
        otherInput = breedValue
    }

    let attitude = []
    document.querySelectorAll('input[name="attitude"]:checked').forEach(function(checkbox) {
        attitude.push(checkbox.value)
    })

    //let imageFile = document.getElementById('imageUpload').files[0];
    //let imageUrl = await uploadImage(imageFile);

    let pet = {
        petId: crypto.randomUUID(), 
        name: document.getElementById('name').value, 
        breed: otherInput, 
        age :document.getElementById('age').value,
        gender :document.getElementById('gender').value,
        intakeDate :document.getElementById('intakeDate').value,
        postDate: postDate,
        weight: document.getElementById('weight').value,
        attitude: attitude,
        aboutMe :document.getElementById('aboutMe').value,
        height :document.getElementById('height').value,
        houseTrained :document.getElementById('houseTrained').value,
        petType: document.getElementById('petType').value,
        adoptionStatus: "open",
        shelterID: 1
        //imageUrl: imageUrl
        //shelter id
    }
    await savePet(pet)
    populateTable()
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

async function handlePetAdoption(petID){
    //1
    const pet = pets.find(pet => pet.petID === petID);
    if (pet) {
        pet.adoptionStatus = "adopted";
        console.log(pet.adoptionStatus)
    }
    //2
    await fetch(petUrl + '/' +petID,{
        method: "PUT",
        body: JSON.stringify(pet),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    })
    populateTable()
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
