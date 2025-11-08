import React, { useState, useEffect } from 'react'


export default function EventsManager() {
  const [events, setEvents] = useState([])
  useEffect(() => {
  fetch('/events.json')
    .then(response => response.json())
    .then(data => setEvents(data))
    .catch(error => console.log("Error loading events:", error))
  }, [])

  return (
    <div>
      <h1 className='flex justify-start text-2xl font-bold'>All Events</h1>
        <ul className="space-y-3 mt-4">
          {events.map(event => (
          <li className="flex items-center justify-between bg-white rounded-lg border p-3 shadow-sm hover:shadow-md transition">
            <div>
              <h3 className="font-semibold text-blue-700">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
            </div>
            <span className="text-xs bg-slate-200 text-blue-800 font-medium hover:text-sm px-2 py-1 rounded-lg">{event.duration} min</span>
          </li>
          ))}
        </ul>
    </div>
  )
}
