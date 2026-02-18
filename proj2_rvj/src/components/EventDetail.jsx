import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { events } from '../data/events'

function EventDetail() {

    const navigate = useNavigate()
    const { id } = useParams()
    const event = events.find(e => e.id === Number(id))

    if (!event) {
        return <h2>Не найдено</h2>
    }

  return (
    <div>
        <h1>{event.title}</h1>
        <p>Категория: {event.category}</p>
        <p>Описание: {event.description}</p>
        <p>Дата: {event.date}</p>
        <p>Цена: {event.price === 0 ? "Бесплатно" : `${event.price}`}</p>
        <button onClick={() => navigate("/events")}>Назад</button>
    </div>
  )
}

export default EventDetail