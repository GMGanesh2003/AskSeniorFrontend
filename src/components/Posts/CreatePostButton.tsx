import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CreatePostModal from '../Modals/CreatePostModal';

const CreatePostButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Create a post</span>
      </button>

      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default CreatePostButton;