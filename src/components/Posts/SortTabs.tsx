import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setSortBy } from '../../store/slices/postsSlice';

const SortTabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(state => state.posts.sortBy);

  const tabs = [
    { id: 'hot' as const, label: 'Hot', icon: '🔥' },
    { id: 'new' as const, label: 'New', icon: '✨' },
    { id: 'top' as const, label: 'Top', icon: '📈' },
    { id: 'rising' as const, label: 'Rising', icon: '🚀' },
  ];

  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => dispatch(setSortBy(tab.id))}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            sortBy === tab.id
              ? 'bg-orange-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SortTabs;