document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('adoptionform');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(form);

            $.ajax({
                url: 'http://localhost:5016/api/message', 
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    fetchNotifications();
                },
                error: function(err) {
                    console.error('Error submitting application:', err);
                }
            });
        });
    } else {
        console.error('Adoption form not found.');
    }
});

function fetchNotifications() {
   
    $.ajax({
        url: 'http://localhost:5016/api/pets',
        method: 'GET',
        success: function(pets) {
           
            $.ajax({
                url: 'http://localhost:5016/api/shelters',
                method: 'GET',
                success: function(shelters) {
                    
                    shelters.forEach(function(shelter) {
                        let notifications = pets.filter(function(pet) {
                            return pet.shelterId === shelter.shelterId;
                        });

                       
                        displayNotifications(shelter, notifications);
                    });
                },
                error: function(err) {
                    console.error('Error fetching shelters:', err);
                }
            });
        },
        error: function(err) {
            console.error('Error fetching pets:', err);
        }
    });
}

function displayNotifications(shelter, notifications) {
    let notificationHTML = '<div class="shelter-notifications">';
    notificationHTML += `<h2>${shelter.name} (${shelter.shelterId})</h2>`;
    if (notifications.length > 0) {
        notificationHTML += '<ul>';
        notifications.forEach(function(notification) {
            notificationHTML += `<li>${notification.name} - ${notification.message}</li>`;
        });
        notificationHTML += '</ul>';
    } else {
        notificationHTML += '<p>No notifications.</p>';
    }
    notificationHTML += '</div>';

    $('#notifications').append(notificationHTML);
}

// ONCE APPLICATION IS FIXED CHECK FOR ERRORS HERE