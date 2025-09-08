import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown, MessageSquare, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { useAppDispatch } from '../../hooks';
import { votePost, toggleSavePost } from '../../store/slices/postsSlice';
import type { Post } from '../../store/slices/postsSlice';

interface PostCardProps {
  post: Post;
  showFullContent?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showFullContent = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleVote = (voteType: 'up' | 'down', e: React.MouseEvent) => {    
    e.preventDefault();
    e.stopPropagation();
    dispatch(votePost({ postId: post._id, voteType }));
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleSavePost(post._id));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/post/${post._id}`);
  };

  const getVoteScore = () => post.upvotes - post.downvotes;

  const handleCardClick = () => {
    if (!showFullContent) {
      navigate(`/post/${post._id}`);
    }
  };

  return (
    <div 
      className={`bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors ${
        !showFullContent ? 'cursor-pointer' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className="flex">
        {/* Vote Section */}
        <div className="flex flex-col items-center bg-gray-800 p-2 space-y-1">
          <button
            onClick={(e) => handleVote('up', e)}
            className={`p-1 rounded hover:bg-gray-700 transition-colors ${
              post.userVote === 'up' ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
            }`}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <span className={`text-sm font-bold ${
            getVoteScore() > 0 ? 'text-orange-500' : getVoteScore() < 0 ? 'text-blue-500' : 'text-gray-400'
          }`}>
            {getVoteScore()}
          </span>
          <button
            onClick={(e) => handleVote('down', e)}
            className={`p-1 rounded hover:bg-gray-700 transition-colors ${
              post.userVote === 'down' ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4">
          {/* Post Header */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
            <Link 
              to={`/r/${post.community}`}
              className="text-white hover:underline font-bold"
              onClick={(e) => e.stopPropagation()}
            >
              r/{post.community}
            </Link>
            <span>•</span>
            <span>Posted by</span>
            <Link 
              to={`/user/${post.author}`}
              className="hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              u/{post.author}
            </Link>
            <span>•</span>
            <span>{post.createdAt}</span>
          </div>

          {/* Post Title */}
          <h2 className="text-lg font-bold text-white mb-2 line-clamp-2">
            {post.title}
          </h2>

          {/* Post Content */}
          <div className="text-gray-300 mb-3">
            {showFullContent ? (
              <p className="whitespace-pre-wrap">{post.content}</p>
            ) : (
              <p className="line-clamp-3">{post.content}</p>
            )}
            
          </div>

          {/* Post Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-600 text-green-100 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center space-x-4 text-sm">
            <button 
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{post.comments} Comments</span>
            </button>
            
            <button 
              onClick={handleShare}
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
            >
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            <button 
              onClick={handleSave}
              className={`flex items-center space-x-1 transition-colors ${
                post.saved ? 'text-yellow-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Save</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;