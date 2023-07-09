const router = require('express').Router()
const Event = require('../model/Events')

router.get('/', async (req, res) => {
    try {
        const { name, location, startDate, endDate } = req.query
        let obj = {}
        if (name) {
            obj.name = { $regex: new RegExp(name), $options: 'i' }
        }
        if (location) {
            obj.location = { $regex: new RegExp(location), $options: 'i' }
        }
        if (startDate) {
            obj.startDate = { $gte: startDate }
        }
        if (endDate) {
            obj.endDate = { $lte: endDate }
        }
        const events = await Event.find(obj)
        res.send(events)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.post('/', async (req, res) => {
    try {
        const event = new Event(req.body)
        const myPattern = /\d|\W/g
        let errorCharacters = (event.name + event.location).match(myPattern)
        errorCharacters = errorCharacters ? errorCharacters.filter(item => item !== " ") : []
        if (errorCharacters.length) {
            throw new Error("Event name and event location cannot contain digits and special characters.")
        }
        const exsitingEvent = await Event.find({ name: event.name, location: event.location, startDate: event.startDate })
        if (exsitingEvent.length) {
            throw new Error("This event already exsists.")
        }
        await event.save()
        res.json({ type: 'success', message: "Event Saved Successfully" })
    } catch (error) {
        res.status(403).json({ message: error.message, type: 'error' })
    }
})

module.exports = router