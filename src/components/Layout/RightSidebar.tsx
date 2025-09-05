import React from 'react';
import { useAppSelector } from '../../hooks';
import CommunityInfo from '../Community/CommunityInfo';
import TrendingToday from '../Trending/TrendingToday';

const RightSidebar: React.FC = () => {
  const posts = useAppSelector(state => state.posts.posts);
  
  // Get trending posts (top 3 by upvotes)
  const trendingPosts = [...posts]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 3);

  return (
    <aside className="w-80 bg-gray-900 border-l border-gray-700 p-4 overflow-y-auto">
      <div className="space-y-6">
        <CommunityInfo />
        <TrendingToday posts={trendingPosts} />
      </div>
    </aside>
  );
};

export default RightSidebar;