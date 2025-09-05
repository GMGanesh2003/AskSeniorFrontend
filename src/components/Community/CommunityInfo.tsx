import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { toggleJoinCommunity } from '../../store/slices/communitiesSlice';

const CommunityInfo: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const communities = useAppSelector(state => state.communities.communities);

  // Extract community name from URL
  const communityName = location.pathname.startsWith('/r/') 
    ? location.pathname.slice(3) 
    : null;

  const community = communityName 
    ? communities.find(c => c.name === communityName)
    : null;

  // Show general info if not on a specific community page
  if (!community) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-bold mb-4">About AskSeniors</h3>
        <p className="text-gray-300 text-sm mb-4">
          A platform for college juniors to connect with verified seniors for placement guidance, 
          academic help, and career advice.
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Members</span>
            <span className="text-white font-medium">50.2k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Online</span>
            <span className="text-green-500 font-medium">2.1k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Created</span>
            <span className="text-white font-medium">Jan 1, 2020</span>
          </div>
        </div>
      </div>
    );
  }

  const handleJoinToggle = () => {
    dispatch(toggleJoinCommunity(community.id));
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">{community.icon}</span>
        <div>
          <h3 className="text-lg font-bold">r/{community.name}</h3>
          <p className="text-gray-400 text-sm">{community.displayName}</p>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-4">
        {community.description}
      </p>
      
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Members</span>
          <span className="text-white font-medium">
            {community.members.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Online</span>
          <span className="text-green-500 font-medium">
            {community.online.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Created</span>
          <span className="text-white font-medium">{community.createdAt}</span>
        </div>
      </div>

      <button
        onClick={handleJoinToggle}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          community.isJoined
            ? 'bg-gray-600 hover:bg-gray-500 text-white'
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
      >
        {community.isJoined ? 'Leave Community' : 'Join Community'}
      </button>
    </div>
  );
};

export default CommunityInfo;