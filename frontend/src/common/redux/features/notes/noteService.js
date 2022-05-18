import axios from "axios";
import React from 'react';

const API_URL = '/api/tickets/'
// Get ticket
export const getNotes = async (ticketId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + ticketId + '/notes', config)
    return response.data
};
const noteService = {
    getNotes
}
export default noteService