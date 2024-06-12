// api/axios.js (or a dedicated file)
import axios from 'axios';

console.log(process.env.NEXT_PUBLIC_API_URL);

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Set your Express server's API base URL
    headers: {
        'Content-Type': 'application/json', // Default content type
        'Access-Control-Allow-Origin': '*',
    },
});

// Optional: Add interceptors for authentication, error handling, etc. (explained later)

const api_cart = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/cart`, // Set your Express server's API base URL
    headers: {
        'Content-Type': 'application/json', // Default content type
        'Access-Control-Allow-Origin': '*',
    },
});

export { api_cart };

export default api;
