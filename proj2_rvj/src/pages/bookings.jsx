import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { events } from '../data/events'
import { useNavigate } from 'react-router-dom'

function Bookings() {

    const {bookings, toggleBookings, user} = useContext(AuthContext)

    if (!user) {
        const navigate = useNavigate()
        return navigate("/login")
    }
    
    const reservedEvents = events.filter((event) => {
        return bookings.includes(event.id)
    })

    return (
        <div>
        <h1>Мои брони</h1>
        {reservedEvents.length === 0 ? (
            <p>nothin телефон такой</p>
        ) : (
            <div>
            {reservedEvents.map((event) => (
                <div key={event.id}>
                <h2>{event.title}</h2>
                <p>Категория: {event.category}</p>
                <p>Цена: {event.price === 0 ? "Бесплатно" : `${event.price}`}</p>

                <button onClick={() => toggleBookings(event.id)}>
                    Отменить бронь
                </button>
                </div>
            ))} {/*map*/}
            </div> /*div*/
        )} {/*operator*/}
        </div>
    );
}

export default Bookings