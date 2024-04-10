const apiUrl = 'http://localhost:5016/api/pets'; 

async function fetchPetData(petId) {
    const response = await fetch(`${apiUrl}/${petId}`);
    const data = await response.json();
    return data;
}

async function populatePetProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('petId');
    const pet = await fetchPetData(petId);
    if (pet) {
        document.getElementById('petName').textContent = pet.name;
        document.getElementById('petBreed').textContent = pet.breed;
        document.getElementById('petAge').textContent = pet.age;
        document.getElementById('petGender').textContent = pet.gender;
        // INPUT THE REST OF THE FIELDS WHEN API IS WORKING
    } else {
        // error handling
        console.error('Pet not found');
    }
}

document.addEventListener('DOMContentLoaded', populatePetProfile);