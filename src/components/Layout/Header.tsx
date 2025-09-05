import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logout } from '../../store/slices/authSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    const userRequest = await fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const userResp = await userRequest.json()
    console.log(userResp);

    dispatch(logout());
    setShowUserMenu(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">AS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AskSeniors</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/home"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/popular"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Popular
            </Link>
            <Link
              to="/all"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              All
            </Link>
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AskSeniors"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <Bell className="h-5 w-5" />
            </button>

            {/* Create Post Button */}
            <Link
              to="/submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Create
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden md:block text-sm font-medium">{user?.username}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    to={`/user/${user?.username}`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;