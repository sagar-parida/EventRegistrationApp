const router = require('express').Router()
const Registration = require('../model/Resgistration')
const Event = require('../model/Events')

router.post('/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId
        const email = req.body.email
        const registration = await Registration.find({ eventId, email })
        if (registration.length) {
            throw new Error("You have already registered for this event.")
        }
        const event = await Event.findById(eventId)
        if (event == null) {
            throw new Error("No event found with this event ID.")
        } else {
            const { activePartipants, maxRegistrations } = event
            if (activePartipants == maxRegistrations) {
                throw new Error("Event has already reached its maximum participants.")
            }
        }
        event.activePartipants += 1
        await event.save()
        const newRegistration = new Registration({ email, eventId })
        await newRegistration.save()
        res.json({ type: 'success', message: "You have successfully registered for this event" })
    } catch (error) {
        res.status(400).json({ type: 'error', message: error.message })
    }
})

module.exports = router