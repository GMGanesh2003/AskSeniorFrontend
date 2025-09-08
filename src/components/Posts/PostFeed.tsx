import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import PostCard from './PostCard';
import { fetchPosts } from '../../store/slices/postsSlice';

interface PostFeedProps {
  showPopularOnly?: boolean;
  communityFilter?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ showPopularOnly, communityFilter }) => {
  const dispatch = useAppDispatch();
  const { posts, sortBy, searchQuery, activeFilters } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...posts];

    // Apply community filter
    if (communityFilter) {
      filtered = filtered.filter(post => post.community === communityFilter);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.community.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply active filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(post => {
        return activeFilters.some(filter => {
          if (filter.startsWith('r/')) {
            return post.community === filter.slice(2);
          }
          if (filter === 'Today') {
            const today = new Date().toDateString();
            const postDate = new Date(post.createdAt).toDateString();
            return postDate === today;
          }
          return post.tags.includes(filter);
        });
      });
    }

    // Apply popular filter
    if (showPopularOnly) {
      filtered = filtered.filter(post => post.upvotes >= 50);
    }

    // Sort posts
    switch (sortBy) {
      case 'hot':
        // Hot algorithm: upvotes / (age in hours + 2)^1.5
        return filtered.sort((a, b) => {
          const aAge = (Date.now() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60);
          const bAge = (Date.now() - new Date(b.createdAt).getTime()) / (1000 * 60 * 60);
          const aHot = a.upvotes / Math.pow(aAge + 2, 1.5);
          const bHot = b.upvotes / Math.pow(bAge + 2, 1.5);
          return bHot - aHot;
        });
      case 'new':
        return filtered.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'top':
        return filtered.sort((a, b) => b.upvotes - a.upvotes);
      case 'rising':
        // Rising: posts with good upvote ratio and recent activity
        return filtered.sort((a, b) => {
          const aRatio = a.upvotes / (a.upvotes + a.downvotes + 1);
          const bRatio = b.upvotes / (b.upvotes + b.downvotes + 1);
          const aRecent = new Date(a.createdAt).getTime();
          const bRecent = new Date(b.createdAt).getTime();
          return (bRatio * bRecent) - (aRatio * aRecent);
        });
      default:
        return filtered;
    }
  }, [posts, sortBy, searchQuery, activeFilters, showPopularOnly, communityFilter]);

  if (filteredAndSortedPosts.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-bold mb-2">No posts found</h3>
        <p className="text-gray-400">
          {searchQuery ? 'Try adjusting your search terms.' : 'Be the first to post in this community!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {filteredAndSortedPosts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;