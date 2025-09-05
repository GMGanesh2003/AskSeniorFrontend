import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import PostFeed from '../Posts/PostFeed';
import SortTabs from '../Posts/SortTabs';
import CommunityHeader from '../Community/CommunityHeader';

const CommunityPage: React.FC = () => {
  const { communityName } = useParams<{ communityName: string }>();
  const community = useAppSelector(state => 
    state.communities.communities.find(c => c.name === communityName)
  );

  if (!community) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Community not found</h1>
        <p className="text-gray-400 mt-2">The community r/{communityName} doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <CommunityHeader community={community} />
      
      <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 z-10">
        <SortTabs />
      </div>
      
      <PostFeed communityFilter={communityName} />
    </div>
  );
};

export default CommunityPage;