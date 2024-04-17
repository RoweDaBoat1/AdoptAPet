const apiUrl = 'http://localhost:5016/api/pets';
const shelterUrl = 'http://localhost:5016/api/shelters';

import nodemailer from 'nodemailer';
import fetch from 'node-fetch'; 

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

        const { petId, ...formFields } = formData;

        const petData = await fetchPetData(petId);
        const shelterId = petData.shelterId;

        const shelterEmail = await fetchShelterEmail(shelterId);

        let htmlBody = '<p>A new adoption form has been submitted with the following details:</p>';
        for (const [fieldName, fieldValue] of Object.entries(formFields)) {
            htmlBody += `<p><strong>${fieldName}:</strong> ${fieldValue}</p>`;
        }

        let mailOptions = {
            from: 'adoptapet321@outlook.com',
            to: shelterEmail,
            subject: 'New Adoption Form Submission',
            html: htmlBody
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
            throw new Error('Failed to fetch pet data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching pet data:', error);
        throw error;
    }
}

async function fetchShelterEmail(shelterId) {
    try {
        const response = await fetch(`${shelterUrl}/${shelterId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch shelter email');
        }
        const shelterData = await response.json();
        return shelterData.email;
    } catch (error) {
        console.error('Error fetching shelter email:', error);
        throw error;
    }
}

export { sendEmailToShelter };