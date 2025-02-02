import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items'; // Base URL for your API

// Fetch items from the API
export const fetchItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error; // Re-throw the error if needed
    }
};

// Submit contact form data to the API
export const submitContactForm = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/contact`, data); // Ensure the endpoint is correct
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error; // Re-throw the error
    }
};

// Create a new item in the API
export const createItem = async (item) => {
    try {
        const response = await axios.post(API_URL, item); // Ensure this is the correct endpoint for item creation
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error creating item:', error);
        throw error; // Re-throw the error if needed
    }
};
