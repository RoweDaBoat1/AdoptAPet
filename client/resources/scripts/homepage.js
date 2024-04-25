const postUrl = "http://localhost:5016/api/ShelterPost"

//const petUrl = apiUrls.petUrl

let posts = []


async function getAllPets(){
    let response = await fetch(postUrl)
    posts = await response.json()
    console.log(posts)
}

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

function populatePosts(shelterPosts) {
    const container = document.getElementById('postContainer');
    container.innerHTML = '';

    shelterPosts.forEach(post => {
        const card = `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${post.name}</h5>
                        <p class="card-text">Description: ${post.message}</p>
                        <p class="card-text">Location: ${post.location}</p>
                        <!-- Add more fields as needed -->
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}


document.addEventListener("DOMContentLoaded", function() {
    function populateShelterPosts(shelterPosts) {
        const container = document.getElementById('postContainer');
        container.innerHTML = '';

        shelterPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('shelter-post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.message}</p>
            `;
            container.appendChild(postElement);
        });
    }

    // Fetch shelter posts from your API
    fetch('http://localhost:5016/api/shelterpost')
        .then(response => response.json())
        .then(shelterPosts => {
            console.log("Shelter posts:", shelterPosts);
            populateShelterPosts(shelterPosts);
        })
        .catch(error => {
            console.error('Error fetching shelter posts:', error);
        });
});
