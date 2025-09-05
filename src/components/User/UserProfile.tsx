import React, { useState } from 'react';
import { Edit2, GraduationCap, Building, Hash, Mail } from 'lucide-react';
import { useAppDispatch } from '../../hooks';
import { updateProfile } from '../../store/slices/authSlice';
import type { AuthUser } from '../../store/slices/authSlice';

interface UserProfileProps {
  user: AuthUser;
  isOwnProfile: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, isOwnProfile }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState(user.bio);
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  const handleSaveProfile = () => {
    dispatch(updateProfile({ bio: editBio, avatar: editAvatar }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditBio(user.bio);
    setEditAvatar(user.avatar);
    setIsEditing(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'first-year': return 'text-green-400';
      case 'second-year': return 'text-blue-400';
      case 'third-year': return 'text-yellow-400';
      case 'fourth-year': return 'text-orange-400';
      case 'alumni': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'first-year': return '1st Year Student';
      case 'second-year': return '2nd Year Student';
      case 'third-year': return '3rd Year Student';
      case 'fourth-year': return '4th Year Student';
      case 'alumni': return 'Alumni';
      default: return role;
    }
  };
  return (
    <div className="bg-gray-800 border-b border-gray-700 animate-fade-in">
      {/* Profile Banner */}
      <div className="h-40 bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-6 text-white">
          <div className="text-sm opacity-75">Welcome to</div>
          <div className="text-2xl font-bold">{user.firstName}'s Profile</div>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex items-end space-x-6 -mt-12">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-3xl border-4 border-gray-800 shadow-xl animate-bounce-slow">
            {isEditing ? (
              <input
                type="text"
                value={editAvatar}
                onChange={(e) => setEditAvatar(e.target.value)}
                className="w-12 h-12 bg-transparent text-center text-2xl"
                maxLength={2}
              />
            ) : (
              user.avatar
            )}
          </div>
          
          {/* User Details */}
          <div className="flex-1 pb-2">
            <h1 className="text-3xl font-bold text-white mb-1">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-400 text-lg">u/{user.username}</p>
            <div className={`inline-flex items-center space-x-1 mt-2 px-3 py-1 rounded-full bg-gray-700 ${getRoleColor(user.role)}`}>
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">{getRoleLabel(user.role)}</span>
            </div>
          </div>
          
          {/* Edit Button */}
          {isOwnProfile && (
            <div className="pb-2">
              {isEditing ? (
                <div className="space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 hover:scale-105 shadow-lg group"
                >
                  <Edit2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Academic Info */}
        <div className="grid md:grid-cols-2 gap-6 mt-6 p-4 bg-gray-700/30 rounded-xl">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Registration:</span>
              <span className="text-white font-medium">{user.registrationNumber}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">College:</span>
              <span className="text-white font-medium">{user.college}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Branch:</span>
              <span className="text-white font-medium">{user.branch}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Graduation:</span>
              <span className="text-white font-medium">{user.graduationYear}</span>
            </div>
          </div>
        </div>
        
        {/* User Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-200 hover:scale-105">
            <div className="text-2xl font-bold text-orange-500">{user.karma.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Total Karma</div>
          </div>
          <div className="text-center p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-200 hover:scale-105">
            <div className="text-2xl font-bold text-blue-500">{user.postKarma.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Post Karma</div>
          </div>
          <div className="text-center p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-200 hover:scale-105">
            <div className="text-2xl font-bold text-green-500">{user.commentKarma.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Comment Karma</div>
          </div>
        </div>
        
        {/* Legacy Stats (keeping for compatibility) */}
        <div className="flex items-center space-x-6 mt-4 text-sm opacity-0">
          <div>
            <span className="text-white font-medium">{user.karma.toLocaleString()}</span>
            <span className="text-gray-400 ml-1">karma</span>
          </div>
          <div>
            <span className="text-orange-500 font-medium">{user.postKarma.toLocaleString()}</span>
            <span className="text-gray-400 ml-1">post karma</span>
          </div>
          <div>
            <span className="text-blue-500 font-medium">{user.commentKarma.toLocaleString()}</span>
            <span className="text-gray-400 ml-1">comment karma</span>
          </div>
        </div>
        
        {/* User Bio */}
        <div className="mt-4">
          {isEditing ? (
            <textarea
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 resize-vertical transition-all duration-200"
            />
          ) : (
            <div className="bg-gray-700/30 rounded-xl p-4 animate-fade-in">
              <p className="text-gray-300 leading-relaxed">
              {user.bio || (isOwnProfile ? 'Add a bio to tell people more about yourself!' : 'This user hasn\'t added a bio yet.')}
            </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;