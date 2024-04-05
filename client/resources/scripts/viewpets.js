function fetchData() {
  return fetch('http://localhost:5016/api/pets')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data; // No need to access 'pets' array as it seems the data already contains pets
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
    });
}

function populateCards() {
  const petsContainer = document.querySelector('.pets');

  fetchData().then(pets => {
    pets.forEach(pet => {
      const petCard = document.createElement('div');
      petCard.classList.add('pet-card');
      petCard.setAttribute('onclick', `redirectToPetPage('${pet.petID}')`);

      const petInfo = document.createElement('div');
      petInfo.classList.add('pet-info');

      const petName = document.createElement('p');
      petName.classList.add('pet-name');
      petName.textContent = pet.name;

      const genderSymbol = document.createElement('span');
      genderSymbol.classList.add('gender-symbol');
      genderSymbol.textContent = pet.gender === 'Female' ? '♀' : '♂';

      const favoriteButton = document.createElement('span');
      favoriteButton.classList.add('favorite');
      favoriteButton.textContent = '★';
      favoriteButton.addEventListener('click', event => {
        event.stopPropagation(); 
        toggleFavorite(event);
      });

      petInfo.appendChild(petName);
      petInfo.appendChild(genderSymbol);
      petCard.appendChild(petInfo);
      petCard.appendChild(favoriteButton);
      petsContainer.appendChild(petCard);
    });
  });
}

document.addEventListener('DOMContentLoaded', populateCards);