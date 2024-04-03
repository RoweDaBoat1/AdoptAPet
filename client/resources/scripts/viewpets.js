
  function fetchData() {
    return fetch('../data/db.json') // Adjust the path to point to the db.json file
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        return data.pets; // assuming we'll call our array "pets"
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
        petCard.setAttribute('onclick', `redirectToPetPage('${pet.Id}')`);
  
        const petImage = document.createElement('img');
        petImage.src = pet.image;
        petImage.alt = pet.name;
  
        const petInfo = document.createElement('div');
        petInfo.classList.add('pet-info');
  
        const petName = document.createElement('p');
        petName.classList.add('pet-name');
        petName.textContent = pet.name;
  
        const genderSymbol = document.createElement('span');
        genderSymbol.classList.add('gender-symbol');
        genderSymbol.textContent = pet.gender === 'M' ? '♂' : '♀';
  
        const favoriteButton = document.createElement('span');
        favoriteButton.classList.add('favorite');
        favoriteButton.textContent = '★';
        favoriteButton.addEventListener('click', event => {
          event.stopPropagation(); 
          toggleFavorite(event);
        });
  
        petInfo.appendChild(petName);
        petInfo.appendChild(genderSymbol);
        petCard.appendChild(petImage);
        petCard.appendChild(petInfo);
        petCard.appendChild(favoriteButton);
        petsContainer.appendChild(petCard);
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', populateCards);