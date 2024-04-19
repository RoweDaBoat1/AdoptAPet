let shelterID
async function handleOnLoad() {
    console.log('true')
    const token = localStorage.getItem('jwt');
    const decodedToken = decodeJWT(token);
    shelterID = parseInt(decodedToken.nameid)
    
    let shelterPrivacy = await getShelterPrivacy(shelterID)
    
    let html = `
    <form onsubmit="handleSubmit()" style="text-align: left;">
    
    <div class="form-row">
        <div class="form-label">Intake Date</div>
        <div class="form-field">
            <input type="radio" id="intakeDatePrivateTrue" class="toggle" name="intakeDatePrivate" value="true" ${shelterPrivacy.intakeDatePrivate ? 'checked' : ''}>
            <label for="intakeDatePrivateTrue">Private</label>
        <input type="radio" id="intakeDatePrivateFalse" class="toggle" name="intakeDatePrivate" value="false" ${!shelterPrivacy.intakeDatePrivate ? 'checked' : ''}>
        <label for="intakeDatePrivateFalse">Public</label>
    </div>
    </div>
    <div class="form-row">
        <div class="form-label">Weight</div>
        <div class="form-field">
            <input type="radio" id="weightPrivateTrue" class="toggle" name="weightPrivate" value="true" ${shelterPrivacy.weightPrivate ? 'checked' : ''}>
            <label for="weightPrivateTrue">Private</label>
            <input type="radio" id="weightPrivateFalse" class="toggle" name="weightPrivate" value="false" ${!shelterPrivacy.weightPrivate ? 'checked' : ''}>
            <label for="weightPrivateFalse">Public</label>
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">Attitude</div>
        <div class="form-field">
            <input type="radio" id="attitudePrivateTrue" class="toggle" name="attitudePrivate" value="true" ${shelterPrivacy.attitudePrivate ? 'checked' : ''}>
            <label for="attitudePrivateTrue">Private</label>
            <input type="radio" id="attitudePrivateFalse" class="toggle" name="attitudePrivate" value="false" ${!shelterPrivacy.attitudePrivate ? 'checked' : ''}>
            <label for="attitudePrivateFalse">Public</label>
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">About Me</div>
        <div class="form-field">
            <input type="radio" id="aboutMePrivateTrue" class="toggle" name="aboutMePrivate" value="true" ${shelterPrivacy.aboutMePrivate ? 'checked' : ''}>
            <label for="aboutMePrivateTrue">Private</label>
            <input type="radio" id="aboutMePrivateFalse" class="toggle" name="aboutMePrivate" value="false" ${!shelterPrivacy.aboutMePrivate ? 'checked' : ''}>
            <label for="aboutMePrivateFalse">Public</label>
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">Height</div>
        <div class="form-field">
            <input type="radio" id="heightPrivateTrue" class="toggle" name="heightPrivate" value="true" ${shelterPrivacy.heightPrivate ? 'checked' : ''}>
            <label for="heightPrivateTrue">Private</label>
            <input type="radio" id="heightPrivateFalse" class="toggle" name="heightPrivate" value="false" ${!shelterPrivacy.heightPrivate ? 'checked' : ''}>
            <label for="heightPrivateFalse">Public</label>
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">House Trained</div>
        <div class="form-field">
            <input type="radio" id="houseTrainedPrivateTrue" class="toggle" name="houseTrainedPrivate" value="true" ${shelterPrivacy.houseTrainedPrivate ? 'checked' : ''}>
            <label for="houseTrainedPrivateTrue">Private</label>
            <input type="radio" id="houseTrainedPrivateFalse" class="toggle" name="houseTrainedPrivate" value="false" ${!shelterPrivacy.houseTrainedPrivate ? 'checked' : ''}>
            <label for="houseTrainedPrivateFalse">Public</label>
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">Distance Preference for Adopters:</div>
        <div class="form-field">
            <input type="number" id="distancePref" name="distancePref" placeholder="miles">
        </div>
    </div>
        <button class="btn btn-primary" type="submit" onclick="handleSavePrivacy('${shelterPrivacy.shelterID}',event)" style="float: center;">Save Preferences</button>
    </form>
    `
    document.getElementById('app').innerHTML = html

    const intakeDateRadioButtons = document.querySelectorAll('input[name="intakeDatePrivate"]');
    intakeDateRadioButtons.forEach(radioButton => {
        if (radioButton.value === String(shelterPrivacy.intakeDatePrivate)) {
            radioButton.checked = true;
        } else {
            radioButton.checked = false;
        }
    });
    const weightRadioButtons = document.querySelectorAll('input[name="weightPrivate"]');
    weightRadioButtons.forEach(radioButton => {
        if (radioButton.value === String(shelterPrivacy.weightPrivate)) {
            radioButton.checked = true;
        } else {
            radioButton.checked = false;
        }
    });
    const attitudeRadioButtons = document.querySelectorAll('input[name="attitudePrivate"]');
    attitudeRadioButtons.forEach(radioButton => {
        if (radioButton.value === String(shelterPrivacy.attitudePrivate)) {
            radioButton.checked = true;
        } else {
            radioButton.checked = false;
        }
    });
    const aboutMeRadioButtons = document.querySelectorAll('input[name="aboutMePrivate"]');
    aboutMeRadioButtons.forEach(radioButton => {
        if (radioButton.value === String(shelterPrivacy.aboutMePrivate)) {
            radioButton.checked = true;
        } else {
            radioButton.checked = false;
        }
    });
    const heightRadioButtons = document.querySelectorAll('input[name="heightPrivate"]');
    heightRadioButtons.forEach(radioButton => {
        if (radioButton.value === String(shelterPrivacy.heightPrivate)) {
            radioButton.checked = true;
        } else {
            radioButton.checked = false;
        }
    });
    const houseTrainedRadioButtons = document.querySelectorAll('input[name="houseTrainedPrivate"]');
    houseTrainedRadioButtons.forEach(radioButton => {
        if (radioButton.value === String(shelterPrivacy.houseTrainedPrivate)) {
            radioButton.checked = true;
        } else {
            radioButton.checked = false;
        }
    });
}

async function getShelterPrivacy(shelterID) {
    // Fetch shelter privacy settings based on shelter ID from the server
    let response = await fetch(`http://localhost:5016/api/ShelterPrivacy/${shelterID}`);
    let shelterPrivacy = await response.json();
    return shelterPrivacy;
}

function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

async function handleSavePrivacy(shelterID, event) {
    event.preventDefault();
    let shelterPrivacy

    shelterPrivacy = {
        shelterID: shelterID,
        intakeDatePrivate: (document.querySelector('input[name="intakeDatePrivate"]:checked').value === "true"),
        weightPrivate: (document.querySelector('input[name="weightPrivate"]:checked').value === "true"),
        attitudePrivate: (document.querySelector('input[name="attitudePrivate"]:checked').value === "true"),
        aboutMePrivate: (document.querySelector('input[name="aboutMePrivate"]:checked').value === "true"),
        heightPrivate: (document.querySelector('input[name="heightPrivate"]:checked').value === "true"),
        houseTrainedPrivate: (document.querySelector('input[name="houseTrainedPrivate"]:checked').value === "true"),
        distancePref: document.getElementById('distancePref').value,
    };
    console.log(shelterPrivacy)

    await fetch('http://localhost:5016/api/ShelterPrivacy' + '/' + shelterID, {
        method: "PUT",
        body: JSON.stringify(shelterPrivacy),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    handleOnLoad();
}
