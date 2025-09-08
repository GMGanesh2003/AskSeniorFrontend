import React from 'react';
import PostFeed from '../Posts/PostFeed';
import SortTabs from '../Posts/SortTabs';
import FilterBar from '../Posts/FilterBar';
import CreatePostButton from '../Posts/CreatePostButton';
import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <SortTabs />
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <span>🔽</span>
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <span>👁️</span>
              <span>View</span>
            </button>
            {
              isAuthenticated 
                ? <CreatePostButton />
                : <Link to={'/login'} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">Get Started</Link>
            }
          </div>
        </div>
        <FilterBar />
      </div>
      
      <PostFeed />
    </div>
  );
};

export default HomePage;