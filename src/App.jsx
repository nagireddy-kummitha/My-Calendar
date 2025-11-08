import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CalendarView from "./components/CalendarView";
import EventsManager from "./components/EventsManager";
import Reports from "./components/Reports";
import Activities from "./components/Activities";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6">
        <Routes>
          <Route path="/" element={<CalendarView />} />
          <Route path="/events" element={<EventsManager />} />
          <Route path="/Activities" element={<Activities />} />
          <Route path="/Reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}
