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
    try {
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
        document.getElementById('petImage').src = "./resources/styles/images/blank profile.jpg"

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
        
            const pendingIcon = document.createElement('i');
            pendingIcon.classList.add('fas', 'fa-hourglass-half');
            document.getElementById('petProfileContainer').appendChild(pendingIcon);
        
            const adoptionFormButton = document.createElement('button');
            adoptionFormButton.textContent = 'Fill out the adoption form';
            adoptionFormButton.id = 'adoptionFormButton'; 
        
            const linkContainer = document.getElementById('adoptionFormLinkContainer');
            if (linkContainer) {
                linkContainer.appendChild(adoptionFormButton);
            } else {
                console.error('Adoption form link container not found');
            }
        } else {
            const adoptionFormUrl = `adoptionform.html?petId=${petId}`;
            const adoptionFormButton = document.createElement('button');
            adoptionFormButton.textContent = 'Click here to fill out the adoption form';
            adoptionFormButton.classList.add('btn', 'btn-primary');
            adoptionFormButton.addEventListener('click', function() {
                window.location.href = adoptionFormUrl; 
            });
        
            const adoptionFormContainer = document.querySelector('.adoption-form-container');
                if (adoptionFormContainer) {
                        adoptionFormContainer.appendChild(adoptionFormButton);
                } else {
                    console.error('Adoption form container not found');
                }
         }
     }
} catch (error) {
    console.error('Error fetching data:', error);
}
}

document.addEventListener('DOMContentLoaded', populatePetProfile);