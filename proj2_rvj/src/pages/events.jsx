import React, { useState } from 'react'
import {events} from '../data/events'

function Events() {

    const [searchData, setSearchData] = useState("")
    const [category, setCategory] = useState("All")
    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchData.toLowerCase())
        const matchesCategory = category === "All" || event.category === category
        return matchesSearch && matchesCategory
    })
  return (
    <div>
        <h1>Events</h1>
        <button onClick={() => setCategory("Party")}>Party</button>
        <div>
            <input type="text" placeholder='Search events' value={searchData} onChange={(e) => setSearchData(e.target.value)} />
        </div>
        <div>
            {filteredEvents.map((event) => (
                <div key={event.id}>
                    <h2>{event.title}</h2>
                    <p>Categiry: {event.category}</p>
                    <p>Price: {event.price}</p>
                    <button>View</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Events