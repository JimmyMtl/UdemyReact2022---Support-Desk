import axios from "axios";
import React from 'react';

const API_URL = '/api/tickets/'
// Get all notes
export const getNotes = async (ticketId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + ticketId + '/notes', config)
    return response.data
};
// Create new ticket note
export const createNote = async (noteText, ticketId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(API_URL + ticketId + '/notes')
    const response = await axios.post(API_URL + ticketId + '/notes',
        {text: noteText},
        config)
    console.log(response.data)
    return response.data
};
const noteService = {
    getNotes,
    createNote
}
export default noteService