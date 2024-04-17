import { sendEmailToShelter } from './sendEmailToShelter.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('adoptionForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); 

        const petId = form.querySelector('[name="petId"]').value;
        await changePetStatusToPending(petId);

        await sendEmailToShelter({ petId });

        alert('Thank you for submitting your adoption application!');

        window.location.href = 'viewpets.html';
    });
});

async function changePetStatusToPending(petId) {
    try {
        const response = await fetch(`http://localhost:5016/api/pets/${petId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ adoptionStatus: 'pending' }) 
        });

        if (!response.ok) {
            throw new Error('Failed to change pet status to pending');
        }
        
        console.log(`Pet status changed to 'pending' for pet with ID ${petId}`);
    } catch (error) {
        console.error('Error changing pet status to pending:', error);
    }
}