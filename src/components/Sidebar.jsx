import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Radio,
  FileText,
  MessageSquare,
} from "lucide-react";

const Sidebar = () => {
  const navClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-2">
          <MessageSquare className="text-white" size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          WhatsApp CRM
        </h2>
      </div>

      <nav className="flex-1 p-4">
        <NavLink to="/dashboard" className={navClass}>
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink to="/broadcast" className={navClass}>
          <Radio size={20} />
          <span className="font-medium">Broadcast</span>
        </NavLink>

        <NavLink to="/reports" className={navClass}>
          <FileText size={20} />
          <span className="font-medium">Reports</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
