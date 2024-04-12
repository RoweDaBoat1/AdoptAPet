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
        document.getElementById('aboutMe').textContent = pet.aboutme;

        
        const adoptionFormUrl = `adoptionform.html?petId=${petId}`;
        
        const adoptionFormLink = document.createElement('a');
        adoptionFormLink.href = adoptionFormUrl;
        adoptionFormLink.textContent = 'Click here to fill out the adoption form';
        
        const linkContainer = document.getElementById('adoptionFormLinkContainer');
        linkContainer.appendChild(adoptionFormLink);
    } else {
        
        console.error('Pet not found');
    }
}

document.addEventListener('DOMContentLoaded', populatePetProfile);