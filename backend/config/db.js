const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_CLOUD : process.env.MONGO_URI_LOCAL)
        console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline)
    } catch (e) {
        console.log(`Error: ${e.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB