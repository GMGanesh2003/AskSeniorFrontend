import React, { useState } from 'react';
import { X, FileText, Image, Link as LinkIcon } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addPost } from '../../store/slices/postsSlice';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const communities = useAppSelector(state => state.communities.communities);
  const currentUser = useAppSelector(state => state.auth.user);
  
  const [postType, setPostType] = useState<'text' | 'image' | 'link'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !selectedCommunity || !currentUser) return;

    const newPost = {
      title: title.trim(),
      content: content.trim(),
      author: currentUser.username,
      community: selectedCommunity,
      type: postType,
      imageUrl: postType === 'image' ? imageUrl : undefined,
      linkUrl: postType === 'link' ? linkUrl : undefined,
      createdAt: 'now',
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    dispatch(addPost(newPost));
    
    // Reset form
    setTitle('');
    setContent('');
    setImageUrl('');
    setLinkUrl('');
    setSelectedCommunity('');
    setTags('');
    setPostType('text');
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Create a post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Community Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Choose a community</label>
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select a community</option>
              {communities.map((community) => (
                <option key={community.id} value={community.name}>
                  r/{community.name}
                </option>
              ))}
            </select>
          </div>

          {/* Post Type Tabs */}
          <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setPostType('text')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                postType === 'text' ? 'bg-gray-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Post</span>
            </button>
            <button
              type="button"
              onClick={() => setPostType('image')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                postType === 'image' ? 'bg-gray-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Image</span>
            </button>
            <button
              type="button"
              onClick={() => setPostType('link')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                postType === 'link' ? 'bg-gray-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              <span>Link</span>
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question or topic?"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Content based on post type */}
          {postType === 'text' && (
            <div>
              <label className="block text-sm font-medium mb-2">Text</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What would you like to discuss?"
                rows={6}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-vertical"
              />
            </div>
          )}

          {postType === 'image' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description (optional)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tell us about this image"
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-vertical"
                />
              </div>
            </>
          )}

          {postType === 'link' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description (optional)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's interesting about this link?"
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-vertical"
                />
              </div>
            </>
          )}

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags (optional)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Interview, Amazon, DSA (comma separated)"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;