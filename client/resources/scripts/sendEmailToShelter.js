const apiUrl = 'http://localhost:5016/api/pets';
const shelterUrl = 'http://localhost:5016/api/shelters';

const nodemailer = require('nodemailer');
const fetch = require('node-fetch'); // Import node-fetch to make HTTP requests

async function sendEmailToShelter(formData) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: true,
            auth: {
                user: 'adoptapet123@outlook.com',
                pass: '123Dirtroad!'
            }
        });

        const { petId } = formData;

        // Fetch the pet data to get the shelter ID
        const petData = await fetchPetData(petId);
        const shelterId = petData.shelterId;

        // Fetch the shelter data to get the shelter email
        const shelterEmail = await fetchShelterEmail(shelterId);

        let mailOptions = {
            from: 'adoptapet321@outlook.com',
            to: shelterEmail,
            subject: 'New Adoption Form Submission',
            text: 'A new adoption form has been submitted.',
            html: `<p>A new adoption form has been submitted for pet ID: ${petId}</p>`
        };

        let info = await transporter.sendMail(mailOptions);

        console.log('Email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email to shelter:', error);
    }
}

async function fetchPetData(petId) {
    try {
        const response = await fetch(`${apiUrl}/${petId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch pet data. Status: ${response.status}`);
        }
        const petData = await response.json();
        return petData;
    } catch (error) {
        console.error('Error fetching pet data:', error);
        throw error; // Rethrow the error to handle it further upstream
    }
}

async function fetchShelterEmail(shelterId) {
    try {
        const response = await fetch(`${shelterUrl}/${shelterId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch shelter data. Status: ${response.status}`);
        }
        const shelterData = await response.json();
        return shelterData.email;
    } catch (error) {
        console.error('Error fetching shelter email:', error);
        throw error; // Rethrow the error to handle it further upstream
    }
}

module.exports = sendEmailToShelter;