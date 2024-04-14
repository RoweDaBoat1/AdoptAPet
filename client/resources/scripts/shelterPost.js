const ShelterPostUrl = 'http://localhost:5016/api/shelterpost';
const apiShelterUrl = 'http://localhost:5016/api/shelters';

async function getShelterID() {
    try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('jwtToken');

        // Check if token is null or empty
        if (!token) {
            throw new Error('JWT token not found in localStorage');
        }

        // Decode the JWT token to extract the payload
        const payload = JSON.parse(atob(token.split('.')[1]));

        // Extract the user ID from the decoded token's payload
        const userID = payload.nameid;

        // Now, you can use the user ID to fetch the shelter ID from the backend
        const response = await fetch(apiShelterUrl + `?userID=${userID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch shelters');
        }
        const shelters = await response.json();

        // Assuming the shelter ID is available in the fetched data
        const shelterID = shelters[0].shelterID; // Adjust this based on your response structure

        return shelterID;
    } catch (error) {
        console.error('Error fetching shelter ID:', error);
        throw error;
    }
}



async function saveShelterPost(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const title = form.elements.title.value;
    const message = form.elements.message.value;

    const shelterID = await getShelterID(); // Get shelter ID

    const shelterpost = {
        ShelterID: shelterID,
        Title: title,
        Message: message
    };

    try {
        const response = await fetch(ShelterPostUrl, {
            method: "POST",
            body: JSON.stringify(shelterpost),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if (!response.ok) {
            throw new Error('Failed to save shelter post');
        }
        // Optionally, you can return some data from the response
        const data = await response.json();
        console.log('Post created:', data);
        // Optionally, you can redirect the user to another page or show a success message
        alert('Post created successfully');
    } catch (error) {
        console.error('Error saving shelter post:', error);
        // Optionally, you can show an error message to the user
        alert('Error creating post');
    }
}

document.getElementById('shelterPostForm').addEventListener('submit', saveShelterPost);
