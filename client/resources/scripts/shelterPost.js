const ShelterPostUrl = 'http://localhost:5016/api/shelterpost';
const apiShelterUrl = 'http://localhost:5016/api/shelters';

let shelterName

async function getShelterID() {
    const token = localStorage.getItem('jwt'); // Implement this function to decode JWT
    const decodedToken = decodeJWT(token);
    const shelterID = parseInt(decodedToken.nameid)
    return shelterID
    // try {
        
    //     const token = localStorage.getItem('jwtToken');

        
    //     if (!token) {
    //         throw new Error('JWT token not found in localStorage');
    //     }

        
    //     const payload = JSON.parse(atob(token.split('.')[1]));

    //     const userID = payload.nameid;

    //     const response = await fetch(apiShelterUrl + `?userID=${userID}`);
    //     if (!response.ok) {
    //         throw new Error('Failed to fetch shelters');
    //     }
    //     const shelters = await response.json();

    //     const shelterID = shelters[0].shelterID; 

    //     return shelterID;
    // } catch (error) {
    //     console.error('Error fetching shelter ID:', error);
    //     throw error;
    // }
}

function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}


async function getShelterData(shelterID) {
    try {
        const response = await fetch(apiShelterUrl + '/' + shelterID);
        if (response.ok) {
            const shelterData = await response.json();
            // Extract the specific variable (e.g., email) from the userData object
            shelterName = shelterData.shelter_Name;
            console.log('Shelter Name:', shelterName);
        } else {
            console.error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    //return shelterName
}


async function saveShelterPost(event) {
    event.preventDefault(); 

    const shelterID = await getShelterID();
    await getShelterData(shelterID)
    const form = event.target;
    const title = form.elements.title.value;
    const message = form.elements.message.value;

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
        
        // const data = await response.json();
        // console.log('Post created:', data);

        let postContainer = document.getElementById('postContainer');
        if (!postContainer) {
            postContainer = document.createElement('div');
            postContainer.id = 'postContainer';
            // Append the container to the document body or any other parent element where you want it to appear
            document.body.appendChild(postContainer);
        }
        
        const postElement = document.createElement('div');
        // Now append the postElement to the postContainer
        postElement.textContent = `Title: ${title}, Message: ${message}\t :${shelterName}`;
        postContainer.appendChild(postElement);
        

        // Append shelterName to the post displayed on the screen
        //const postContainer = document.getElementById('postContainer');
        //postContainer.appendChild(postElement);
        
        alert('Post created successfully');
    } catch (error) {
        console.error('Error saving shelter post:', error);
        
        alert('Error creating post');
    }
}

document.getElementById('shelterPostForm').addEventListener('submit', saveShelterPost);
