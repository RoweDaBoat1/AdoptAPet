const ShelterPostUrl = 'http://localhost:5016/api/shelterpost';
const apiShelterUrl = 'http://localhost:5016/api/shelters';

async function getShelterID() {
    try {
        
        const token = localStorage.getItem('jwt');

        
        if (!token) {
            throw new Error('JWT not found in localStorage');
        }

        
        const payload = JSON.parse(atob(token.split('.')[1]));

        const userID = payload.nameid;

        const response = await fetch(apiShelterUrl + `?userID=${userID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch shelters');
        }
        const shelters = await response.json();

        const shelterID = shelters[0].shelterID; 

        return shelterID;
    } catch (error) {
        console.error('Error fetching shelter ID:', error);
        throw error;
    }
}



async function saveShelterPost(event) {
    event.preventDefault(); 

    const form = event.target;
    const title = form.elements.title.value;
    const message = form.elements.message.value;

    const shelterID = await getShelterID();

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
        
        const data = await response.json();
        console.log('Post created:', data);
        
        alert('Post created successfully');
    } catch (error) {
        console.error('Error saving shelter post:', error);
        
        alert('Error creating post');
    }
}

document.getElementById('shelterPostForm').addEventListener('submit', saveShelterPost);
