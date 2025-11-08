import React, { useEffect, useMemo, useState } from "react";
import {
  addDays, addMonths, format, startOfMonth, endOfMonth,
  startOfWeek, endOfWeek, subMonths, isSameMonth, isToday, parse, addMinutes
} from "date-fns";

function EventModal({ open, onClose, date, list }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-lg shadow-xl">
        <div className="flex border justify-between mb-3">
          <h3 className=" font-semibold text-lg">{format(date, "MMMM d, yyyy")}</h3>
          <button onClick={onClose} className="px-2 py-1 text-sm hover:bg-gray-100 hover:font-semibold rounded">Close</button>
        </div>
        {list.length === 0 ? (
          <p className="text-sm text-gray-600">No events today.</p>
        ) : (
          <ul className="space-y-2">
            {list.map((ev) => {
              const s = parse(`${ev.date} ${ev.time}`, "yyyy-MM-dd HH:mm", new Date());
              const e = addMinutes(s, ev.duration);
              return (
                <li key={ev.id} className="border rounded-lg p-3">
                  <div className="font-medium">{ev.title}</div>
                  <div className="text-sm text-gray-600">
                    {format(s, "hh:mm a")} - {format(e, "hh:mm a")}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function CalendarView() {
  const [viewDate, setViewDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState({ open: false, date: null, list: [] });

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

  const start = startOfWeek(startOfMonth(viewDate));
  const end = endOfWeek(endOfMonth(viewDate));
  const days = [];
  for (let d = start; d <= end; d = addDays(d, 1)) days.push(d);

  const eventsByDate = useMemo(() => {
    const map = new Map();
    events.forEach((e) => {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date).push(e);
    });
    return map;
  }, [events]);

  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold">{format(viewDate, "MMMM yyyy")}</div>
        <div className="flex gap-2">
          <button onClick={() => setViewDate(subMonths(viewDate, 1))} className="px-3 py-1 border rounded hover:bg-gray-100">◀</button>
          <button onClick={() => setViewDate(addMonths(viewDate, 1))} className="px-3 py-1 border rounded hover:bg-gray-100">▶</button>
          <button onClick={() => setViewDate(new Date())} className="px-3 py-1 border rounded hover:bg-blue-50">Today</button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center bg-blue-50 rounded-t-lg text-xs font-semibold text-gray-700">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="p-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 border border-t-0 rounded-b-lg bg-white shadow-sm">
        {days.map((d) => {
          const dateStr = format(d, "yyyy-MM-dd");
          const daily = eventsByDate.get(dateStr) || [];
          return (
            <div
              key={dateStr}
              onClick={() => setModal({ open: true, date: d, list: daily })}
              className={`p-2 h-28 border hover:bg-blue-50 cursor-pointer text-left ${
                !isSameMonth(d, viewDate) ? "bg-slate-50 text-gray-400" : ""
              }`}
            >
              <div className={`text-sm ${isToday(d) ? "text-blue-600 font-bold" : "text-gray-700"}`}>
                {format(d, "d")}
              </div>
              <div className="mt-1 space-y-1">
                {daily.slice(0, 2).map((e) => (
                  <div key={e.id} className="text-[11px] truncate bg-blue-100 text-blue-800 rounded px-1 py-[2px]">
                    {e.title}
                  </div>
                ))}
                {daily.length > 2 && <div className="text-[10px] text-blue-500">+{daily.length - 2} more</div>}
              </div>
            </div>
          );
        })}
      </div>

      <EventModal open={modal.open} onClose={() => setModal({ open: false })} date={modal.date} list={modal.list} />
    </section>
  );
}
