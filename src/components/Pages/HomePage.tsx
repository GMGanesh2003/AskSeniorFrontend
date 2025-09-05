import React from 'react';
import PostFeed from '../Posts/PostFeed';
import SortTabs from '../Posts/SortTabs';
import FilterBar from '../Posts/FilterBar';
import CreatePostButton from '../Posts/CreatePostButton';

const HomePage: React.FC = () => {
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
            <CreatePostButton />
          </div>
        </div>
        <FilterBar />
      </div>
      
      <PostFeed />
    </div>
  );
};

export default HomePage;