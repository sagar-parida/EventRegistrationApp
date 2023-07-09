const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name: String,
    location: String,
    startDate: Date,
    endDate: Date,
    maxRegistrations: Number,
    activePartipants: {
        type: Number,
        default: 0
    }
})


module.exports = mongoose.model('Event', EventSchema)