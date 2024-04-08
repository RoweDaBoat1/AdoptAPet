// apiUrls.js

class ApiUrls {
    constructor() {
        this.baseUrl = 'https://localhost:5016/api';
        this.petUrl = `${this.baseUrl}/pets`;
        this.shelterUrl = `${this.baseUrl}/Shelters`;
        this.userUrl = `${this.baseUrl}/Users`;
        this.donationUrl = `${this.baseUrl}/donations`
    }
}
// Export the ApiUrls class so that it can be imported into other files
export default ApiUrls;

// How to use/reference in other js files (below)

    //import ApiUrls from './apiUrls.js';

    //const apiUrls = new ApiUrls();

    //console.log(apiUrls.petUrl); // Output: https://api.example.com/login
    //console.log(apiUrls.userUrl); // Output: https://api.example.com/user/profile
    //console.log(apiUrls.shelterUrl); // Output: https://api.example.com/data

