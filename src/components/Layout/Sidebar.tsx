import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Grid3x3 } from 'lucide-react';
import { useAppSelector } from '../../hooks';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const joinedCommunities = useAppSelector(state => state.communities.joinedCommunities);

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto">
      <nav className="p-4">
        {/* Main Navigation */}
        <div className="space-y-2">
          <Link
            to="/"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          
          <Link
            to="/popular"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/popular') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Popular</span>
          </Link>
          
          <Link
            to="/all"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/all') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
            <span>All</span>
          </Link>
        </div>

        {/* Your Communities */}
        <div className="mt-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Your Communities
          </h2>
          <div className="space-y-1">
            {joinedCommunities.map((community) => (
              <Link
                key={community.id}
                to={`/r/${community.name}`}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === `/r/${community.name}` 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className="text-lg">{community.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">r/{community.name}</div>
                  <div className="text-xs text-gray-400">
                    {community.members.toLocaleString()} members
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;