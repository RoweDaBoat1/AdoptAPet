const apiUrl = 'http://localhost:5016/api/pets';

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const pets = await response.json();
    return pets;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Return a default value or an empty array
    return [];
  }
}

function redirectToPetPage(petID) {
  window.location.href = `petprofile.html?petId=${petID}`;
}

async function populateCards() {
  const petsContainer = document.querySelector('.pets');

  try {
      const pets = await fetchData();
      pets.forEach(async pet => {
          const petCard = await createPetCard(pet);
          petCard.addEventListener('click', () => redirectToPetPage(pet.petID));
          
          if (pet.adoptionStatus === 'pending') {
              const pendingMessage = document.createElement('p');
              pendingMessage.textContent = 'Pending';
              petCard.appendChild(pendingMessage);
          }
          
          petsContainer.appendChild(petCard);
      });
  } catch (error) {
      console.error('Error populating cards:', error);
  }
}

async function createPetCard(pet) {
  const petCard = document.createElement('div');
  petCard.classList.add('pet-card');

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

  petCard.appendChild(petInfo);

  return petCard;
}

const filters = {
  breed: '',
  weight: '',
  height: '',
  attitude: '',
  house_trained: '',
  age: '',
  gender: ''
};

async function populateHardCodedFilterOptions() {
  const breeds = ['', 'Lakeland Terrier', 'Mini Goldendoodle', 'Chocolate Lab', 'Siberian Husky', 'Ragdoll', 'Lab', 'White Retriever', 'Poodle'];
  const weights = ['', 'SMALL (2-22 lbs.)', 'MEDIUM (24-57 lbs.)', 'LARGE (59-99 lbs.)', 'X-LARGE (100+ lbs.)'];
  const heights = ['', 'SMALL: 12" or Less', 'MEDIUM: 13" to 16" inches', 'LARGE: 17" to 20" inches', 'X-LARGE: 21" to 27" inches', 'XX-LARGE 28" or UP'];
  const attitudes = ['', 'Friendly', 'Playful', 'Anxious', 'Independent', 'Calm'];
  const houseTrainedOptions = ['', 'Yes', 'No'];
  const ages = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Over 10', 'Under 1'];
  const genders = ['', 'Male', 'Female'];

  populateSelectOptions('breed', breeds);
  populateSelectOptions('weight', weights);
  populateSelectOptions('height', heights);
  populateSelectOptions('attitude', attitudes);
  populateSelectOptions('house_trained', houseTrainedOptions);
  populateSelectOptions('age', ages);
  populateSelectOptions('gender', genders);
}

function populateSelectOptions(selectId, options) {
  const select = document.getElementById(selectId);
  if (!select) {
    console.error(`Element with ID '${selectId}' not found.`);
    return;
  }

  select.innerHTML = '';

  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
}

function updateFilters() {
  filters.breed = document.getElementById('breed').value;
  filters.weight = document.getElementById('weight').value;
  filters.height = document.getElementById('height').value;
  filters.attitude = document.getElementById('attitude').value;
  filters.house_trained = document.getElementById('house_trained').value;
  filters.age = document.getElementById('age').value;
  filters.gender = document.getElementById('gender').value;
}

function applyFilters(pets) {
  return pets.filter(pet => {
    const breedFilter = !filters.breed || filters.breed === '' || filters.breed === 'Any' || pet.breed === filters.breed;
    const weightFilter = !filters.weight || filters.weight === '' || filters.weight === 'Any' || pet.weight === filters.weight;
    const heightFilter = !filters.height || filters.height === '' || filters.height === 'Any' || pet.height === filters.height;
    const attitudeFilter = !filters.attitude || filters.attitude === '' || filters.attitude === 'Any' || pet.attitude === filters.attitude;
    const houseTrainedFilter = !filters.house_trained || filters.house_trained === '' || filters.house_trained === 'Any' || pet.house_trained === filters.house_trained;
    const ageFilter = !filters.age || filters.age === '' || filters.age === 'Any' || pet.age === filters.age;
    const genderFilter = !filters.gender || filters.gender === '' || filters.gender === 'Any' || pet.gender === filters.gender;

    return breedFilter && weightFilter && heightFilter && attitudeFilter &&
      houseTrainedFilter && ageFilter && genderFilter;
  });
}

async function populateFilteredCards() {
  const petsContainer = document.querySelector('.pets');
  const pets = await fetchData();
  updateFilters();

  petsContainer.innerHTML = '';

  const filteredPets = applyFilters(pets);

  filteredPets.forEach(pet => {
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

    petCard.appendChild(petInfo);
    petsContainer.appendChild(petCard);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await populateCards();
  populateHardCodedFilterOptions();

  const submitButton = document.getElementById('submit-btn');
  submitButton.addEventListener('click', async () => {
    await populateFilteredCards();
  });
});

// SOMETHING IS WRONG SERVER SIDE AND IS NO LONGER ALLOWING THE PETS TO POPULATE