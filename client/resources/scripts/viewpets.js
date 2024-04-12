const apiUrl = 'http://localhost:5016/api/pets';

async function fetchData() {
  const response = await fetch(apiUrl)
  const data = response.json()
  return data

    
}

async function populateCards() {
  const petsContainer = document.querySelector('.pets');

  pets = await fetchData()
  pets.forEach(pet => {
    const petCard = document.createElement('div');
    petCard.classList.add('pet-card');
    petCard.setAttribute('onclick', `redirectToPetPage('${pet.petID}')`);

    const petInfo = document.createElement('div');
    petInfo.classList.add('pet-info');

    const petName = document.createElement('p');
    petName.classList.add('pet-name');
    petName.textContent = pet.name;

    const petBreed = document.createElement('p');
    petBreed.classList.add('pet-breed');
    petBreed.textContent = `Breed: ${pet.breed}`;

    const petAge = document.createElement('p');
    petAge.classList.add('pet-age');
    petAge.textContent = `Age: ${pet.age}`;

    const petGender = document.createElement('p');
    petGender.classList.add('pet-gender');
    petGender.textContent = `Gender: ${pet.gender}`;

    petInfo.appendChild(petName);
    petInfo.appendChild(petBreed);
    petInfo.appendChild(petAge);
    petInfo.appendChild(petGender);
    petsContainer.appendChild(petCard);
  });
}

function redirectToPetPage(petId) {
  window.location.href = `petprofile.html?petId=${petId}`;
}

document.addEventListener('DOMContentLoaded', populateCards);