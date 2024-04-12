// apiUrls.js

class apiUrls {
    baseUrl;
    petUrl;
    shelterUrl;
    userUrl;
    donationUrl;
    constructor() {
        baseUrl = 'http://localhost:5016/api';
        petUrl = `${baseUrl}/pets`;
        shelterUrl = `${baseUrl}/Shelters`;
        userUrl = `${baseUrl}/Users`;
        donationUrl = `${baseUrl}/donations`
    }
}
// Export the ApiUrls class so that it can be imported into other files
//export default apiUrls;

// How to use/reference in other js files (below)

    //import ApiUrls from './apiUrls.js';

    //const apiUrls = new ApiUrls();

    //console.log(apiUrls.petUrl); // Output: https://api.example.com/login
    //console.log(apiUrls.userUrl); // Output: https://api.example.com/user/profile
    //console.log(apiUrls.shelterUrl); // Output: https://api.example.com/data

