import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './slices/postsSlice';
import communitiesSlice from './slices/communitiesSlice';
import commentsSlice from './slices/commentsSlice';
import userSlice from './slices/userSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    communities: communitiesSlice,
    comments: commentsSlice,
    user: userSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;