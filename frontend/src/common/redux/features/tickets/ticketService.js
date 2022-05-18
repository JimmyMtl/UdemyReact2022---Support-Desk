import axios from "axios";

const API_URL = '/api/tickets/'

// Create new ticket
export const createTicket = async (ticketData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, ticketData, config)

    return response.data
};
// Get user tickets
export const getTickets = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
};
// Get ticket
export const getTicket = async (ticketId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + ticketId, config)

    return response.data
};
// Close ticket
export const closeTicket = async (ticketId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + ticketId,
        {status: 'closed'}, config)

    return response.data
};
const ticketService = {createTicket, getTickets, getTicket, closeTicket}
export default ticketService;

