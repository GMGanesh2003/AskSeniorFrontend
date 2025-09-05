import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import LandingPage from '../Auth/LandingPage';
import LoginPage from '../Auth/LoginPage';
import RegisterPage from '../Auth/RegisterPage';
import ProtectedRoute from '../Auth/ProtectedRoute';
import HomePage from '../Pages/HomePage';
import PopularPage from '../Pages/PopularPage';
import AllPage from '../Pages/AllPage';
import CommunityPage from '../Pages/CommunityPage';
import PostDetailPage from '../Pages/PostDetailPage';
import ProfilePage from '../Pages/ProfilePage';

const AppRoutes: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
      <Route path="/popular" element={
        <ProtectedRoute>
          <PopularPage />
        </ProtectedRoute>
      } />
      <Route path="/all" element={
        <ProtectedRoute>
          <AllPage />
        </ProtectedRoute>
      } />
      <Route path="/r/:communityName" element={
        <ProtectedRoute>
          <CommunityPage />
        </ProtectedRoute>
      } />
      <Route path="/post/:postId" element={
        <ProtectedRoute>
          <PostDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/user/:username" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;