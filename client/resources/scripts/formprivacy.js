//const shelterPrivacyUrl = "http://localhost:5016/api/ShelterPrivacy"

const shelterPrivacyUrl = apiUrls.shelterPrivacyUrl
// may not actually need this url since the id is added to the object in createaccount.js but also might since the save button uses id
//const shelterUrl = "http://localhost:5016/api/shelter"


async function handleOnLoad() {
    let shelterPrivacy = await getAllShelterPrivacy()
    //let shelter = await getAllShelters();
    let html = `
    <form onsubmit="handleSubmit()" style="text-align: left;">
    
    <div class="form-row">
        <div class="form-label">Intake Date</div>
        <div class="form-field">
            <input type="checkbox" id="intakeDatePrivate" class="toggle" name="intakeDatePrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">Weight</div>
        <div class="form-field">
            <input type="checkbox" id="weightPrivate" class="toggle" name="weightPrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">Attitude</div>
        <div class="form-field">
            <input type="checkbox" id="attitudePrivate" class="toggle" name="attitudePrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">About Me</div>
        <div class="form-field">
            <input type="checkbox" id="aboutMePrivate" class="toggle" name="aboutMePrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">Height</div>
        <div class="form-field">
            <input type="checkbox" id="heightPrivate" class="toggle" name="heightPrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">House Trained</div>
        <div class="form-field">
            <input type="checkbox" id="houseTrainedPrivate" class="toggle" name="houseTrainedPrivate">
        </div>
    </div>
    <div class="form-row">
        <div class="form-label">Distance Preference for Adopters:</div>
        <div class="form-field">
            <input type="text" id="distancePref" name="distancePref" placeholder="miles">
        </div>
    </div>
        <button class="btn btn-primary" onclick="handleSavePrivacy('${shelterPrivacy.shelterId}')" style="float: center;">Save Preferences</button>
    </form>
    `
    document.getElementById('app').innerHTML = html
    document.getElementById('intakeDatePrivate').checked = shelterPrivacy.intakeDatePrivate
    document.getElementById('weightPrivate').checked = shelterPrivacy.weightPrivate
    document.getElementById('attitudePrivate').checked = shelterPrivacy.attitudePrivate
    document.getElementById('aboutMePrivate').checked = shelterPrivacy.aboutMePrivate
    document.getElementById('heightPrivate').checked = shelterPrivacy.heightPrivate
    document.getElementById('houseTrainedPrivate').checked = shelterPrivacy.houseTrainedPrivate
    document.getElementById('distancePref').innerHTML = shelterPrivacy.distancePref
}

async function handleSavePrivacy(shelterId){
    let shelterPrivacy = {
        shelterId: shelterid, 
        intakeDatePrivate :document.getElementById('intakeDate').value,
        weightPrivate: document.getElementById('weight').value,
        attitudePrivate: attitudes,
        aboutMePrivate :document.getElementById('aboutMe').value,
        heightPrivate :document.getElementById('height').value,
        houseTrainedPrivate :document.getElementById('houseTrained').value,
        distancePref: document.getElementById('distancePref').value,
    }
    await fetch(shelterPrivacyUrl + '/' + pet.id,{
        method: "PUT",
        body: JSON.stringify(shelterPrivacy),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    })
    handleOnLoad()
}

// //function to see who is logged in and retrieve their data