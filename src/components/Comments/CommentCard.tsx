import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MessageSquare, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { voteComment, addComment, editComment, toggleEditComment, deleteComment } from '../../store/slices/commentsSlice';
import type { Comment } from '../../store/slices/commentsSlice';

interface CommentCardProps {
  comment: Comment;
  level?: number;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, level = 0 }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.user);
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState(comment.content);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleVote = (voteType: 'up' | 'down') => {
    dispatch(voteComment({ commentId: comment.id, voteType }));
  };

  const handleReply = () => {
    if (!replyText.trim() || !currentUser) return;

    dispatch(addComment({
      postId: comment.postId,
      parentId: comment.id,
      content: replyText.trim(),
      author: currentUser.username,
      createdAt: 'now',
    }));

    setReplyText('');
    setShowReplyBox(false);
  };

  const handleEdit = () => {
    if (!editText.trim()) return;
    dispatch(editComment({ commentId: comment.id, content: editText.trim() }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment(comment.id));
    }
  };

  const getVoteScore = () => comment.upvotes - comment.downvotes;
  const isAuthor = comment.author === currentUser.username;
  const maxLevel = 5; // Prevent infinite nesting

  return (
    <div className={`${level > 0 ? 'ml-4 border-l border-gray-700 pl-4' : ''}`}>
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        {/* Comment Header */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
          <span className="font-medium text-blue-400">u/{comment.author}</span>
          <span>•</span>
          <span>{comment.createdAt}</span>
          {isAuthor && (
            <>
              <span>•</span>
              <span className="text-green-400">author</span>
            </>
          )}
        </div>

        {/* Comment Content */}
        <div className="mb-3">
          {comment.isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-vertical"
                rows={3}
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => dispatch(toggleEditComment(comment.id))}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-300 whitespace-pre-wrap">{comment.content}</p>
          )}
        </div>

        {/* Comment Actions */}
        <div className="flex items-center space-x-4 text-sm">
          {/* Vote Buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleVote('up')}
              className={`p-1 rounded hover:bg-gray-700 transition-colors ${
                comment.userVote === 'up' ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
              }`}
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <span className={`text-sm font-medium ${
              getVoteScore() > 0 ? 'text-orange-500' : getVoteScore() < 0 ? 'text-blue-500' : 'text-gray-400'
            }`}>
              {getVoteScore()}
            </span>
            <button
              onClick={() => handleVote('down')}
              className={`p-1 rounded hover:bg-gray-700 transition-colors ${
                comment.userVote === 'down' ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
              }`}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Reply Button */}
          {level < maxLevel && (
            <button
              onClick={() => setShowReplyBox(!showReplyBox)}
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Reply</span>
            </button>
          )}

          {/* Author Actions */}
          {isAuthor && (
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              
              {showActions && (
                <div className="absolute top-6 right-0 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      dispatch(toggleEditComment(comment.id));
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-600 w-full text-left"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      handleDelete();
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-gray-600 w-full text-left"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reply Box */}
        {showReplyBox && (
          <div className="mt-4 space-y-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="What are your thoughts?"
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-vertical"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white px-4 py-1 rounded text-sm transition-colors"
              >
                Reply
              </button>
              <button
                onClick={() => setShowReplyBox(false)}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;