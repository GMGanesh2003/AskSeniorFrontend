import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import type { Post } from '../../store/slices/postsSlice';

interface TrendingTodayProps {
  posts: Post[];
}

const TrendingToday: React.FC<TrendingTodayProps> = ({ posts }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold">Trending Today</h3>
      </div>
      
      <div className="space-y-3">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="block p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <div className="flex items-start space-x-3">
              <span className="text-orange-500 font-bold text-lg">{index + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium line-clamp-2 mb-1">
                  {post.title}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span>r/{post.community}</span>
                  <span>•</span>
                  <span>{post.upvotes} upvotes</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {posts.length === 0 && (
        <p className="text-gray-400 text-sm">No trending posts today</p>
      )}
    </div>
  );
};

export default TrendingToday;