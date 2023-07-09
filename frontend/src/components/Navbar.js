import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <div>
            <h1>Event Registration App</h1>
            <div>
                <Link to="/">Home</Link>
                {/* <Link to="/registration">Registration</Link> */}
                <Link to="/events">Events</Link>
            </div>
        </div>
    )
}

export default Navbar