import React from 'react';
import { useAppDispatch } from '../../hooks';
import { toggleJoinCommunity } from '../../store/slices/communitiesSlice';
import type { Community } from '../../store/slices/communitiesSlice';

interface CommunityHeaderProps {
  community: Community;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ community }) => {
  const dispatch = useAppDispatch();

  const handleJoinToggle = () => {
    dispatch(toggleJoinCommunity(community.id));
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      {/* Community Banner */}
      <div className="h-32 bg-gradient-to-r from-orange-600 to-orange-800"></div>
      
      {/* Community Info */}
      <div className="px-6 pb-4">
        <div className="flex items-end space-x-4 -mt-8">
          {/* Community Icon */}
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl border-4 border-gray-800">
            {community.icon}
          </div>
          
          {/* Community Details */}
          <div className="flex-1 pb-2">
            <h1 className="text-2xl font-bold text-white">r/{community.name}</h1>
            <p className="text-gray-400">{community.displayName}</p>
          </div>
          
          {/* Join Button */}
          <div className="pb-2">
            <button
              onClick={handleJoinToggle}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                community.isJoined
                  ? 'bg-gray-600 hover:bg-gray-500 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {community.isJoined ? 'Joined' : 'Join'}
            </button>
          </div>
        </div>
        
        {/* Community Stats */}
        <div className="flex items-center space-x-6 mt-4 text-sm">
          <div>
            <span className="text-white font-medium">{community.members.toLocaleString()}</span>
            <span className="text-gray-400 ml-1">members</span>
          </div>
          <div>
            <span className="text-green-500 font-medium">{community.online.toLocaleString()}</span>
            <span className="text-gray-400 ml-1">online</span>
          </div>
          <div>
            <span className="text-gray-400">Created {community.createdAt}</span>
          </div>
        </div>
        
        {/* Community Description */}
        <p className="text-gray-300 mt-3 text-sm">{community.description}</p>
      </div>
    </div>
  );
};

export default CommunityHeader;