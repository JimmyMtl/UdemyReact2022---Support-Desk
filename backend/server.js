const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const PORT = process.env.PORT || 8000
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const path = require("path");

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/users', require('./routes/user/userRoutes'))
app.use('/api/tickets', require('./routes/ticket/ticketRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.status(201).json({message: 'Welcome to the support desk API'})
    })
}
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))