const petUrl = "https://localhost:5016/api/pets"
let pets = []

const imageUpload = document.getElementById('imageUpload')
const imagePreview = document.getElementById('imagePreview')

imageUpload.addEventListener('change', function(){
    const file = this.file[0]
    if(file){
        const reader = new FileReader();
        reader.onload= function(){
            const img= document.getElementById('img')
            img.src = reader.result
            imagePreview.innerHTML= ''
            imagePreview.appendChild(img)
        }
        reader.readAsDataURL(file)
    }
})


function handleOnLoad(){
    let html = `
        <div id = "petTable"></div>
        <form onsubmit = "return false">
            <h3>Add Pet Listing</h3>
            <input type="text" id="name" placeholder="Name" required style="margin-bottom: 10px;"><br>
            <label for = "shelterName">Pet Type:</label><br>
            <select name="type" id="type" required style="margin-bottom: 10px;">
                <option value="null">-</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
            </select><br>
            <input type="text" id="breed" placeholder="Breed" style="margin-bottom: 10px;"><br>
            <input type="number" id="age" placeholder="Age" style="margin-bottom: 10px;" required><br>
            <label for = "gender">Gender:</label><br>
            <select name="type" id="type" style="margin-bottom: 10px;">
                <option value="null">-</option>
                <option value="male">M</option>
                <option value="female">F</option>
            </select><br>
            <label for = "intakeDate">Intake Date:</label><br>
            <input type="date" id="intakeDate" placeholder="Intake Date" style="margin-bottom: 10px;" required><br>
            <input type="text" id="weight" placeholder="Weight" style="margin-bottom: 10px;"><br>
            <input type="text" id="height" placeholder="Height" required style="margin-bottom: 10px;"><br>
            <label for = "attitude">Attitude:</label><br>
            <select name="attitude" id="attitude" style="margin-bottom: 10px;" required><br>
                <option value="null">-</option>
                <option value="yes">Shy</option>
                <option value="no">Friendly</option>
            </select><br>
            <label for = "houseTrained">Housetrained:</label><br>
            <select name="houseTrained" id="houseTrained" style="margin-bottom: 10px;" required><br>
                <option value="null">-</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select><br>
            <textarea id="aboutMe" placeholder="About" style="width:400px; height:100px" required></textarea><br>
            <label for="imageUpload" style="margin-top: 10px;">Upload Image:</label>
            <input type="file" id="imageUpload" accept="image/*" style="margin-top: 10px;"required>
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

async function populateTable(){
    await getAllPets()
    //sortTable()
    let html = `
    <table class = "table table-striped">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Intake Date</th>
            <th>Status</th>
        </tr>`
    pets.forEach(function(pet){
        if(pet.adopted == false){
            html+= `
            <tr>
                <td>${pet.id}</td>
                <td>${pet.name}</td>
                <td>${pet.type}</td>
                <td>${pet.breed}</td>
                <td>${pet.age}</td>
                <td>${pet.gender}</td>
                <td>${pet.intakeDate}</td>
                <td><button class = "btn btn-danger" onclick= "handlePetAdoption('${pet.id}')">Delete</button></td>
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
    let pet = {
        id: crypto.randomUUID(), 
        name: document.getElementById('name').value, 
        breed: document.getElementById('breed').value, 
        age :document.getElementById('age').value,
        gender :document.getElementById('gender').value,
        //location : document.getElementById('age').value, 
        intakeDate :document.getElementById('intakeDate').value,
        weight: document.getElementById('weight').value,
        attitude :document.getElementById('attitude').value,
        aboutMe :document.getElementById('aboutMe').value,
        // shelterID:
        //TELL EVERYONE YOU CHANGED THE VARIABLE NAME AND TYPE
        adopted: false,
        height :document.getElementById('height').value,
        houseTrained :document.getElementById('houseTrained').value,
        petType: document.getElementById('type').value
        //add image info variable here 
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

async function handlePetAdoption(id, button){
    //1
    const pet = pets.find(pet => pet.id === id);
    if (pet) {
        pet.adopted = !pet.adopted;
        console.log(pet.adopted)
    }
    //2
    await fetch(url + '/' +id,{
        method: "PUT",
        body: JSON.stringify(pet),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    })
    populateTable()
}
