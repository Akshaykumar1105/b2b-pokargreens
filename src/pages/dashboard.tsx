// src/pages/Dashboard.jsx

import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaBox, FaSignOutAlt } from "react-icons/fa";
import Header from "@/components/Header";
import { useAuth } from "./AuthContext";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) navigate("/"); // Redirect to login page if no token
  }, [navigate]);

  const token = localStorage.getItem("authToken");
  if (!token) return null;

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken");
    navigate("/"); // Redirect to login after logout
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex lg:block items-center justify-between">
                <div className="px-4 py-2">
                  <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Account
                  </h2>
                </div>
                <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className={`flex items-center w-full px-4 py-3 text-sm rounded-lg transition-colors ${
                      location.pathname === "/dashboard"
                        ? "bg-green-50 text-green-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FaUser className="w-4 h-4 mr-3" />
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={() => navigate("/dashboard/my-orders")}
                    className={`flex items-center w-full px-4 py-3 text-sm rounded-lg transition-colors ${
                      location.pathname === "/dashboard/my-orders"
                        ? "bg-green-50 text-green-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FaBox className="w-4 h-4 mr-3" />
                    <span>My Orders</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors mt-4"
                  >
                    <FaSignOutAlt className="w-4 h-4 mr-3" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
