const apiUrl = 'http://localhost:5016/api/pets'; 
const apiShelterUrl = 'http://localhost:5016/api/shelters';

async function fetchPetData(petId) {
    const response = await fetch(`${apiUrl}/${petId}`);
    const data = await response.json();
    return data;
}

async function fetchShelterData(shelterID){
    const response = await fetch(`${apiShelterUrl}/${shelterID}`);
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
        document.getElementById('weight').textContent = pet.weight;
        document.getElementById('attitude').textContent = pet.attitude;
        document.getElementById('aboutMe').textContent = pet.aboutMe;
        document.getElementById('height').textContent = pet.height;
        document.getElementById('houseTrained').textContent = pet.houseTrained;
        document.getElementById('petType').textContent = pet.petType;
        document.getElementById('petImage').src = `data:image/png;base64, ${pet.imageData}`;

        const shelter = await fetchShelterData(pet.shelterID);
        if (shelter) {
            document.getElementById('shelter_Name').textContent = shelter.shelter_Name;
            document.getElementById('phone_Number').textContent = shelter.phone_Number;
            document.getElementById('email').textContent = shelter.email;
        } else {
            console.error('Failed to fetch shelter data for pet');
        }

        if (pet.adoptionStatus === 'pending') {
            const pendingMessage = document.createElement('p');
            pendingMessage.textContent = 'Pending';
            document.getElementById('petProfileContainer').appendChild(pendingMessage);
        }
        
        const adoptionFormUrl = `adoptionform.html?petId=${petId}`;
        
        const adoptionFormLink = document.createElement('a');
        adoptionFormLink.href = adoptionFormUrl;
        adoptionFormLink.textContent = 'Click here to fill out the adoption form';
        
        const linkContainer = document.getElementById('adoptionFormLinkContainer');
        if (linkContainer) {
            linkContainer.appendChild(adoptionFormLink);
        } else {
            console.error('Adoption form link container not found');
        }
    }
}

document.addEventListener('DOMContentLoaded', populatePetProfile);