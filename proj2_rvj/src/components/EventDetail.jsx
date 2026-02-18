import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { events } from '../data/events'

function EventDetail() {

    const navigate = useNavigate()
    const { id } = useParams()
    const event = events.find(e => e.id === Number(id)) // params в строки переводит, хоть бы кто то мне это сказал раньше

    if (!event) {
        return <h2>Not Found</h2>
    }

  return (
    <div>
        <h1>{event.title}</h1>
        <p>Category: {event.category}</p>
        <p>Description: {event.description}</p>
        <p>Date: {event.date}</p>
        <p>Price: {event.price === 0 ? "Free" : `${event.price}`}</p>
        <button onClick={() => navigate("/events")}>Back</button>
    </div>
  )
}

export default EventDetail