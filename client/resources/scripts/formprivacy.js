//const shelterPrivacyUrl = "http://localhost:5016/api/ShelterPrivacy"

//const shelterPrivacyUrl = apiUrls.shelterPrivacyUrl
// may not actually need this url since the id is added to the object in createaccount.js but also might since the save button uses id
//const shelterUrl = "http://localhost:5016/api/shelter"


async function handleOnLoad() {
    const token = localStorage.getItem('jwt'); // Implement this function to decode JWT
    const decodedToken = decodeJWT(token);
    const shelterID = decodedToken.nameid
    
    let shelterPrivacy = await getShelterPrivacy(shelterID)
    //let shelter = await getAllShelters();
    let html = `
    <form onsubmit="handleSubmit()" style="text-align: left;">
    
    <div class="form-row">
        <div class="form-label">Intake Date</div>
        <div class="form-field">
            <input type="radio" id="intakeDatePrivate" class="toggle" name="intakeDatePrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">Weight</div>
        <div class="form-field">
            <input type="radio" id="weightPrivate" class="toggle" name="weightPrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">Attitude</div>
        <div class="form-field">
            <input type="radio" id="attitudePrivate" class="toggle" name="attitudePrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">About Me</div>
        <div class="form-field">
            <input type="radio" id="aboutMePrivate" class="toggle" name="aboutMePrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">Height</div>
        <div class="form-field">
            <input type="radio" id="heightPrivate" class="toggle" name="heightPrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">House Trained</div>
        <div class="form-field">
            <input type="radio" id="houseTrainedPrivate" class="toggle" name="houseTrainedPrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">Distance Preference for Adopters:</div>
        <div class="form-field">
            <input type="text" id="distancePref" name="distancePref" placeholder="miles">
        </div>
    </div>
        <button class="btn btn-primary" onclick="handleSavePrivacy('${shelterPrivacy.shelterID}')" style="float: center;">Save Preferences</button>
    </form>
    `
    document.getElementById('app').innerHTML = html
    document.getElementById('intakeDatePrivate').checked = shelterPrivacy.intakeDatePrivate
    document.getElementById('weightPrivate').checked = shelterPrivacy.weightPrivate
    document.getElementById('attitudePrivate').checked = shelterPrivacy.attitudePrivate
    document.getElementById('aboutMePrivate').checked = shelterPrivacy.aboutMePrivate
    document.getElementById('heightPrivate').checked = shelterPrivacy.heightPrivate
    document.getElementById('houseTrainedPrivate').checked = shelterPrivacy.houseTrainedPrivate
    document.getElementById('distancePref').value = shelterPrivacy.distancePref
}

async function getShelterPrivacy(shelterID) {
    // Fetch shelter privacy settings based on shelter ID from the server
    let response = await fetch(`http://localhost:5016/api/shelterPrivacy/${shelterID}`);
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


async function handleSavePrivacy(shelterID){
    let shelterPrivacy = {
        shelterID: shelterID, 
        intakeDatePrivate :document.getElementById('intakeDate').value,
        weightPrivate: document.getElementById('weight').value,
        attitudePrivate: attitudes,
        aboutMePrivate :document.getElementById('aboutMe').value,
        heightPrivate :document.getElementById('height').value,
        houseTrainedPrivate :document.getElementById('houseTrained').value,
        distancePref: document.getElementById('distancePref').value,
    }
    await fetch(shelterPrivacyUrl + '/' + shelterID,{
        method: "PUT",
        body: JSON.stringify(shelterPrivacy),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    })
    handleOnLoad()
}

// //function to see who is logged in and retrieve their data