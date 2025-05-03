// ProfileDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProfileDashboard: React.FC = () => {
  const { currentUser, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'edit' | 'password' | 'orders' | 'account' | 'logout'>('edit');
  
  // Form state for editing profile
  const [profileForm, setProfileForm] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
  });
  
  // Prevent unauthorized access
  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      email: profileForm.email,
    });
    alert('Profile updated successfully!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      logout();
      navigate('/');
      alert('Your account has been deleted.');
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      {/* Header with background image */}
      <div 
        className="w-full h-48 bg-cover bg-center mb-8"
        style={{ 
          backgroundImage: 'url(/assets/imgs/food-banner.jpg)', 
          backgroundPosition: 'center bottom' 
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white pt-16">Profile Dashboard</h1>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex flex-col">
                {/* Edit Profile */}
                <button 
                  onClick={() => setActiveSection('edit')}
                  className={`flex items-center p-4 text-left group ${
                    activeSection === 'edit' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 mr-3" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                  Edit Profile
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-auto" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </button>

                {/* Reset Password */}
                <button 
                  onClick={() => setActiveSection('password')}
                  className={`flex items-center p-4 text-left group ${
                    activeSection === 'password' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 mr-3" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                    />
                  </svg>
                  Reset Password
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-auto" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </button>

                {/* All Orders */}
                <button 
                  onClick={() => setActiveSection('orders')}
                  className={`flex items-center p-4 text-left group ${
                    activeSection === 'orders' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 mr-3" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                    />
                  </svg>
                  All Orders
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-auto" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </button>

                {/* Logout */}
                <button 
                  onClick={handleLogout}
                  className={`flex items-center p-4 text-left group ${
                    activeSection === 'logout' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 mr-3" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                  </svg>
                  Logout
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-auto" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </button>

                {/* Delete Account */}
                <button 
                  onClick={handleDeleteAccount}
                  className={`flex items-center p-4 text-left group ${
                    activeSection === 'account' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 mr-3" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                  Delete Account
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-auto" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {activeSection === 'edit' && (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
                  
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow">
                        {currentUser.firstName ? (
                          <span className="text-4xl font-bold text-gray-600">
                            {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
                          </span>
                        ) : (
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-12 w-12 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                            />
                          </svg>
                        )}
                      </div>
                      <button 
                        className="absolute bottom-0 right-0 bg-green-600 text-white p-1 rounded-full"
                        aria-label="Edit profile picture"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <p className="text-center font-medium text-gray-600 mb-6">
                    {currentUser.firstName} {currentUser.lastName}
                    <br />
                    <span className="text-gray-500 text-sm">
                      {currentUser.email}
                    </span>
                  </p>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <div className="bg-gray-100 rounded-md px-3 py-2">
                          <input 
                            type="text"
                            name="firstName"
                            value={profileForm.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <div className="bg-gray-100 rounded-md px-3 py-2">
                          <input 
                            type="text"
                            name="lastName"
                            value={profileForm.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="bg-gray-100 rounded-md px-3 py-2">
                          <input 
                            type="email"
                            name="email"
                            value={profileForm.email}
                            onChange={handleInputChange}
                            className="w-full bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ID Number
                        </label>
                        <div className="bg-gray-100 rounded-md px-3 py-2">
                          <input 
                            type="text"
                            readOnly
                            value="445555"
                            className="w-full bg-transparent focus:outline-none text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                      >
                        Update Profile
                      </button>
                    </div>
                  </form>
                </>
              )}

              {activeSection === 'password' && (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Reset Password</h2>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <div className="bg-gray-100 rounded-md px-3 py-2">
                        <input 
                          type="password"
                          className="w-full bg-transparent focus:outline-none"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <div className="bg-gray-100 rounded-md px-3 py-2">
                        <input 
                          type="password"
                          className="w-full bg-transparent focus:outline-none"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <div className="bg-gray-100 rounded-md px-3 py-2">
                        <input 
                          type="password"
                          className="w-full bg-transparent focus:outline-none"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </>
              )}

              {activeSection === 'orders' && (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
                  <div className="text-center py-12 text-gray-500">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-16 w-16 mx-auto mb-4 text-gray-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                      />
                    </svg>
                    <p className="text-lg">You haven't placed any orders yet.</p>
                    <p className="mt-2">Check out our products and place your first order!</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;