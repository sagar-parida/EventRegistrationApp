import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Registration = () => {

    const params = useParams()

    const [userEmail, setUserEmail] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const [successMessage, setSuccessMessage] = useState('')

    function handleEmailChange(e) {
        setUserEmail(e.target.value)
        setErrorMessage('')
        setSuccessMessage('')
    }

    function handleRegister() {
        fetch(`http://localhost:8000/registration/${params.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userEmail })
        })
            .then(res => res.json())
            .then(res => {
                if (res.type == 'error') {
                    setErrorMessage(res.message)
                } else {
                    setSuccessMessage(res.message)
                }
            })
            .catch(err => setErrorMessage(err.message))
    }
    return (
        <div>
            {errorMessage.length ? <p style={{ color: 'red' }}>{errorMessage}</p> : null}
            {successMessage.length ? <p style={{ color: 'green' }}>{successMessage}</p> : null}
            <label>Please enter your email address to register</label>
            <input type='email' onChange={handleEmailChange} />
            <button onClick={handleRegister}>Register Now</button>
        </div>
    )
}

export default Registration