import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import PostCard from '../Posts/PostCard';
import CommentSection from '../Comments/CommentSection';
import { fetchComments } from '../../store/slices/commentsSlice';

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = useAppSelector(state => 
    state.posts.posts.find(p => p._id === postId)
  );

  const dispatch = useAppDispatch();

  // const { comments, loading, error } = useAppSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="text-gray-400 mt-2">This post doesn't exist or has been deleted.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-4">
        <PostCard post={post} showFullContent />
      </div>
      <CommentSection postId={post._id} />
    </div>
  );
};

export default PostDetailPage;