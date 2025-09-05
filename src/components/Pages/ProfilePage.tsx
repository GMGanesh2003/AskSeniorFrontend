import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import UserProfile from '../User/UserProfile';
import UserPosts from '../User/UserPosts';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const currentUser = useAppSelector(state => state.auth.user);
  
  // For now, we'll show the current user's profile
  // Later this can be extended to show other users' profiles
  const user = currentUser;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className="text-gray-400 mt-2">The user u/{username} doesn't exist.</p>
      </div>
    );
  }

  const isOwnProfile = user.username === username;

  return (
    <div className="max-w-4xl mx-auto">
      <UserProfile user={user} isOwnProfile={isOwnProfile} />
      <UserPosts user={user} />
    </div>
  );
};

export default ProfilePage;