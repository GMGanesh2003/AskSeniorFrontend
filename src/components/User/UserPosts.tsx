import React, { useState } from 'react';
import { useAppSelector } from '../../hooks';
import PostCard from '../Posts/PostCard';
import type { AuthUser } from '../../store/slices/authSlice';

interface UserPostsProps {
  user: AuthUser;
}

const UserPosts: React.FC<UserPostsProps> = ({ user }) => {
  const posts = useAppSelector(state => state.posts.posts);
  const comments = useAppSelector(state => state.comments.comments);
  
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'saved'>('posts');
  
  const userPosts = posts.filter(post => post.author.username === user.username);
  const userComments = comments.filter(comment => comment.author === user.username);
  const savedPosts = posts.filter(post => post.saved);

  const tabs = [
    { id: 'posts' as const, label: 'Posts', count: userPosts.length },
    { id: 'comments' as const, label: 'Comments', count: userComments.length },
    { id: 'saved' as const, label: 'Saved', count: savedPosts.length },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 z-10">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-lg scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs transition-all duration-200 ${
                activeTab === tab.id ? 'bg-orange-600' : 'bg-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {userPosts.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold mb-2">No posts yet</h3>
                <p className="text-gray-400">This user hasn't posted anything yet.</p>
              </div>
            ) : (
              userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-4">
            {userComments.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold mb-2">No comments yet</h3>
                <p className="text-gray-400">This user hasn't commented on anything yet.</p>
              </div>
            ) : (
              userComments.map((comment) => {
                const post = posts.find(p => p.id === comment.postId);
                return (
                  <div key={comment.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">
                      Comment on{' '}
                      <span className="text-blue-400 hover:underline cursor-pointer">
                        {post?.title || 'Unknown post'}
                      </span>{' '}
                      in r/{post?.community}
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      <span>{comment.upvotes - comment.downvotes} points</span>
                      <span>{comment.createdAt}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="space-y-4">
            {savedPosts.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold mb-2">No saved posts</h3>
                <p className="text-gray-400">Save posts to view them here later.</p>
              </div>
            ) : (
              savedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPosts;