import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'

const Card = ({ _id, name, location, startDate, endDate, maxPeople, nowPeople }) => {

    const history = useNavigate()

    function handleRegistration(id) {
        console.log(history(`/registration/${id}`))
    }

    function getDate(dateString) {
        const date = new Date(dateString)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (
        <div className='card'>
            <p>Name: {name}</p>
            <p>Location: {location}</p>
            <p>Start Date: {getDate(startDate)}</p>
            <p>End: {getDate(endDate)}</p>
            <p>Max Participants: {maxPeople}</p>
            <p>Current Participants: {nowPeople}</p>
            <button className='register' onClick={() => handleRegistration(_id)}>Register</button>
        </div>
    )
}

export default Card