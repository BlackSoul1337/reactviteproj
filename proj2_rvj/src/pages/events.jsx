import React, { useState } from 'react'
import {events} from '../data/events'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

function Events() {

    const navigate = useNavigate()
    const {bookings, toggleBookings, user} = useContext(AuthContext)
    const [searchData, setSearchData] = useState("")
    const [category, setCategory] = useState("All")
    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchData.toLowerCase())
        const matchesCategory = category === "All" || event.category === category
        return matchesSearch && matchesCategory
    })
    
  return (
    <div>
        <h1>Мероприятия</h1>
        <div>
            <input type="text" placeholder='Искать мероприятия...' value={searchData} onChange={(e) => setSearchData(e.target.value)} />
        </div>
        <div>
            <button onClick={() => setCategory("All")}>Все</button>
            <button onClick={() => setCategory("Music")}>Музыка</button>
            <button onClick={() => setCategory("Party")}>Развлечения</button>
            <button onClick={() => setCategory("Education")}>Обучающие</button>
        </div>
        <div>
            {filteredEvents.map((event) => {
                const isBooked = bookings.includes(event.id);
                return (
                    <div key={event.id}>
                        <h2>{event.title}</h2>
                        <p>Категория: {event.category}</p>
                        <p>Цена: {event.price === 0 ? "Бесплатно" : `${event.price}`}</p>
                        <button onClick={() => navigate(`/events/${event.id}`)}>Просмотреть</button> 

                        {user ? (
                            <button onClick={() => toggleBookings(event.id)}>
                                {isBooked ? "Отменить" : "Бронь"}
                            </button>
                        ) : (
                            <p>Залогиньтесь для бронирования</p>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default Events