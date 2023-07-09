import React, { useEffect, useState } from 'react'
import './Home.css'
import Card from '../Card'
const Home = () => {

    const [eventsData, setEventsData] = useState([])

    const [formValues, setFormValues] = useState({})

    function onDataEntry(e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    function handleSearch() {
        let url = 'http://localhost:8000/events?'
        for (const key in formValues) {
            if (formValues[key].length) {
                url += `${key}=${formValues[key]}&`
            }
        }
        url = url.slice(0, -1)
        fetch(url)
            .then(res => res.json())
            .then(res => setEventsData(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch('http://localhost:8000/events')
            .then(res => res.json())
            .then(res => setEventsData(res))
            .catch(err => console.log(err))
    }, [])
    // console.log(formValues)
    return (
        <div className='main'>
            <div className='search'>
                <label>Name:</label>
                <input type="text" name="name" onChange={onDataEntry} />
                <label>Location:</label>
                <input type='text' name="location" onChange={onDataEntry} />
                <label>Start Date:</label>
                <input type='date' name="startDate" onChange={onDataEntry} />
                <label>End Date:</label>
                <input type='date' name="endDate" onChange={onDataEntry} />
                <button className='searchButton' onClick={handleSearch}>Search</button>
            </div>
            <div className='results'>
                {
                    eventsData.length && <div className='cardsContainer'>
                        {
                            eventsData.map(item => {
                                return <Card key={item._id} _id={item._id} name={item.name} location={item.location} startDate={item.startDate} endDate={item.endDate} maxPeople={item.maxRegistrations} nowPeople={item.activePartipants} />
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Home