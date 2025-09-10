import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addComment } from '../../store/slices/commentsSlice';
import CommentCard from './CommentCard';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.user);
  const comments = useAppSelector(state =>
    state.comments.comments.filter(c => c.postId === postId && !c.parentId)
  );
  
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    const request = await fetch(`http://localhost:5000/api/v1/answer/${postId}/comments`, {
      method: "POST",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        content: newComment.trim()
      })
    })
    const resp = await request.json()
    console.log(resp);

    dispatch(addComment({
      postId,
      content: newComment.trim(),
      author: {username: currentUser.username, _id: ""},
      createdAt: 'now',
    }));

    setNewComment('');
  };

  return (
    <div className="p-4 border-t border-gray-700">
      {/* Add Comment */}
      <div className="mb-6">
        <form onSubmit={handleSubmitComment} className="space-y-3">
          <div className="text-sm text-gray-400">
            Comment as <span className="text-blue-400">u/{currentUser?.username}</span>
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="What are your thoughts?"
            rows={3}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-vertical"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Comment
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;