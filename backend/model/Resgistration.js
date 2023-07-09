const mongoose = require('mongoose')

const RegistrationSchema = new mongoose.Schema({
    email: String,
    eventId: String
})


module.exports = mongoose.model('Registration', RegistrationSchema)