import React from 'react';
import PostFeed from '../Posts/PostFeed';
import SortTabs from '../Posts/SortTabs';

const PopularPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 z-10">
        <h1 className="text-2xl font-bold mb-4">Popular Posts</h1>
        <SortTabs />
      </div>
      
      <PostFeed showPopularOnly />
    </div>
  );
};

export default PopularPage;