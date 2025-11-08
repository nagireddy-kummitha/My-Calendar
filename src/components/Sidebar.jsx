import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, name }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `block px-4 py-2 rounded-xl text-sm font-medium transition ${
        isActive
          ? "bg-blue-100 text-blue-700"
          : "text-gray-700 hover:bg-gray-100"
      }`
    }
  >
    {name}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="md:block w-56 bg-white h-screen border-r p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-blue-600">Nagi's Calendar</h1>
      </div>
      <nav className="space-y-1">
        <NavItem to="/" name="Calendar" />
        <NavItem to="/events" name="Events" />
        <NavItem to="/activities" name="Activities" />
        <NavItem to="/reports" name="Reports" />
      </nav>
      <div className="mt-auto pt-10 text-xs text-gray-500">© 2025 Nagi's Calendar</div>
    </aside>
  );
}
