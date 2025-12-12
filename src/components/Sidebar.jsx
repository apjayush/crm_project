import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Radio,
  FileText,
  MessageSquare,
  LogOut,
  Users,
  BarChart3,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    `group w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  const handleLogout = async () => {
    await fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/");
  };

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
            <MessageSquare className="text-white" size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">WhatsApp CRM</h2>
            <p className="text-xs text-gray-500">Business Suite</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
            Main Menu
          </p>
          
          <NavLink to="/dashboard" className={navClass}>
            <LayoutDashboard size={20} strokeWidth={2} />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink to="/broadcast" className={navClass}>
            <Radio size={20} strokeWidth={2} />
            <span className="font-medium">Broadcast</span>
          </NavLink>

          <NavLink to="/reports" className={navClass}>
            <FileText size={20} strokeWidth={2} />
            <span className="font-medium">Reports</span>
          </NavLink>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
            Management
          </p>
          
          <NavLink to="/contacts" className={navClass}>
            <Users size={20} strokeWidth={2} />
            <span className="font-medium">Contacts</span>
          </NavLink>

          <NavLink to="/analytics" className={navClass}>
            <BarChart3 size={20} strokeWidth={2} />
            <span className="font-medium">Analytics</span>
          </NavLink>
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              AB
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@company.com</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
        >
          <LogOut size={18} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;