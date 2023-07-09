import React, { useState } from 'react'
import './Events.css'
import { useNavigate } from 'react-router-dom'
const Events = () => {

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState('')

    const [successMessage, setSuccessMessage] = useState('')

    const [formValues, setFormValues] = useState({
        name: '',
        location: '',
        maxRegistrations: '',
        startDate: '',
        endDate: ''
    })

    function handleChange(e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
        setErrorMessage('')
    }

    function redirectHome() {
        let i = 5
        let timer = setInterval(() => {
            if (i == 0) {
                navigate('/')
                clearInterval(timer)
            }
            setSuccessMessage(`Redirecting to Home in ${i} seconds.`)
            i--
        }, 1000)
    }


    function handleCreate() {
        for (const key in formValues) {
            if (!formValues[key]) {
                return alert("Please enter all values")
            }
        }
        fetch('http://localhost:8000/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
            .then(res => res.json())
            .then(res => {
                if (res.type === 'error') {
                    setErrorMessage(res.message)
                } else {
                    alert(res.message)
                    redirectHome()
                }
            })
            .catch(err => setErrorMessage(err.message))
    }

    return (
        <div>
            <h1>Create new Event</h1>
            {errorMessage.length ? <p style={{ color: 'red' }}>{errorMessage}</p> : null}
            {successMessage.length ? <p style={{ color: 'green' }}>{successMessage}</p> : null}
            <div className='form'>
                <label>Name of the event:</label>
                <input type='text' name='name' onChange={handleChange} />
                <label>Location of the event:</label>
                <input type='text' name='location' onChange={handleChange} />
                <label>Start Date:</label>
                <input type='date' name='startDate' onChange={handleChange} />
                <label>End Date:</label>
                <input type='date' name='endDate' onChange={handleChange} />
                <label>Max allowed participants:</label>
                <input type='number' name='maxRegistrations' onChange={handleChange} />
                <button className='create' onClick={handleCreate}>Create Event</button>
            </div>
        </div>
    )
}

export default Events