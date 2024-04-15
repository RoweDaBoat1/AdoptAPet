document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('adoptionForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formDataJSON = {};
        for (let [key, value] of new FormData(form).entries()) {
            formDataJSON[key] = value;
        }

        try {
            const patchResponse = await fetch(`http://localhost:5016/api/pets/${formDataJSON.petId}`);
            if (!patchResponse.ok) {
                throw new Error('Failed to fetch pet data');
            }
            const petData = await patchResponse.json();

            if (petData.adoptionStatus === 'pending') {
                alert('This pet is already pending adoption. Please choose another pet.');
                return; 
            }
        } catch (error) {
            console.error('Error checking pet status:', error);
            alert('Error checking pet status. Please try again later.');
            return; 
        }

        try {
            const patchResponse = await fetch(`http://localhost:5016/api/pets/${formDataJSON.petId}/adoptionStatus`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ adoptionStatus: 'pending' })
            });

            if (!patchResponse.ok) {
                throw new Error('Failed to set adoption status to pending');
            }
        } catch (error) {
            console.error('Error updating adoption status:', error);
            alert('Error updating adoption status. Please try again later.');
            return; 
        }

        try {
            const postResponse = await fetch('http://localhost:5016/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJSON)
            });

            if (!postResponse.ok) {
                throw new Error('Failed to submit adoption application');
            }

            alert('Thank you for submitting your adoption application!');
            // Optionally, you can redirect the user to another page after successful submission
            // window.location.href = 'success.html';
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Error submitting your adoption application. Please try again later.');
        }
    });
});

// NEED CORRECT API TO POST THE APPLICATION TO