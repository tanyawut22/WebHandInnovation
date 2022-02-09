import axios from 'axios';
export const HTTP = axios.create({
baseURL: 'https://magellan.ais.co.th',
});