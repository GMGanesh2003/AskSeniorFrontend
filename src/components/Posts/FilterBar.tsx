import React from 'react';
import { X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { removeFilter, clearFilters } from '../../store/slices/postsSlice';

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeFilters = useAppSelector(state => state.posts.activeFilters);

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className="text-gray-400">Active filters:</span>
      {activeFilters.map((filter) => (
        <div
          key={filter}
          className="flex items-center space-x-1 bg-green-600 text-green-100 px-2 py-1 rounded-full"
        >
          <span>{filter}</span>
          <button
            onClick={() => dispatch(removeFilter(filter))}
            className="hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <button
        onClick={() => dispatch(clearFilters())}
        className="text-blue-400 hover:text-blue-300 transition-colors underline"
      >
        Clear all
      </button>
    </div>
  );
};

export default FilterBar;