import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { useAppDispatch, useAppSelector } from '../../hooks';
import type { Comment } from '../../store/slices/commentsSlice';
import { addComment, deleteComment, editComment, toggleEditComment } from '../../store/slices/commentsSlice';

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

  const handleReply = () => {
    if (!replyText.trim() || !currentUser) return;

    dispatch(addComment({
      _id: "",
      postId: comment.postId,
      parentId: comment.id,
      content: replyText.trim(),
      author: { username: currentUser.username, _id: "" },
      createdAt: new Date().toISOString(),
    }));

    setReplyText('');
    setShowReplyBox(false);
  };

  const handleEdit = () => {
    if (!editText.trim()) return;
    dispatch(editComment({ commentId: comment._id, content: editText.trim() }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment(comment._id));
    }
  };

  const isAuthor = comment.author.username === currentUser?.username;

  return (
    <div className={`${level > 0 ? 'ml-4 border-l border-gray-700 pl-4' : ''}`}>
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        {/* Comment Header */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
          <span className="font-medium text-blue-400">u/{comment.author.username}</span>
          <span>•</span>
          <span><ReactTimeAgo date={new Date(comment.createdAt)} locale="en-US" /></span>
          {isAuthor && (
            <>
              <span>•</span>
              <span className="text-green-400">author</span>
            </>
          )}
          {/* Author Actions */}
          {/* {isAuthor && (
            <>
              <span>•</span>

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
            </>
          )} */}
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
                  onClick={() => dispatch(toggleEditComment(comment._id))}
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