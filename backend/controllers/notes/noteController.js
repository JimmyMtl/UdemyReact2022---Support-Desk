const asyncHandler = require('express-async-handler')

const User = require('../../models/users/userModel')
const Notes = require('../../models/notes/noteModel')
const Ticket = require('../../models/tickets/ticketModel')


// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.ticketId)
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const notes = await Notes.find({ticket: req.params.ticketId})
    res.status(200).json(notes)
})
// @desc    Create ticket notes
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.ticketId)
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const note = await Notes.create({
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: false,
        user: user._id
    })
    res.status(200).json(note)
})
module.exports = {getNotes, addNote}