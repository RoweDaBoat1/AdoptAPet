const featuredPets = [
    { name: 'Featured Pet 1', age: '2 years', gender: 'Male', breed: 'Mixed Breed', image: 'path_to_image' },
    { name: 'Featured Pet 2', age: '3 years', gender: 'Female', breed: 'Labrador Retriever', image: 'path_to_image' },
    { name: 'Featured Pet 3', age: '1 year', gender: 'Male', breed: 'German Shepherd', image: 'path_to_image' }
];

function populateFeaturedPets() {
    const container = document.getElementById('featured-pets-container');
    container.innerHTML = '';

    featuredPets.forEach(pet => {
        const card = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${pet.image}" class="card-img-top" alt="${pet.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pet.name}</h5>
                        <p class="card-text">Age: ${pet.age}</p>
                        <p class="card-text">Gender: ${pet.gender}</p>
                        <p class="card-text">Breed: ${pet.breed}</p>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

populateFeaturedPets();

document.addEventListener("DOMContentLoaded", function() {
    console.log("Homepage loaded!");
});