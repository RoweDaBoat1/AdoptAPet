document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('adoptionForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // Fetch form data
        const formData = new FormData(form);

        // Process form data (WRITE THE CODE TO SEND THE DATA TO THE SERVER FOR NOTIFICATIONS ETC...)

        //Success message?
        alert('Thank you for submitting your adoption application!');
    });
});