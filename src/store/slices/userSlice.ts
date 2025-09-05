import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  karma: number;
  cakeDay: string;
  postKarma: number;
  commentKarma: number;
}

export interface UserState {
  currentUser: User;
  users: User[];
}

const mockCurrentUser: User = {
  id: '1',
  username: 'current_user',
  displayName: 'u/current_user',
  bio: 'Final year CSE student looking for placement advice',
  avatar: '👤',
  karma: 1250,
  cakeDay: 'Jan 15, 2023',
  postKarma: 850,
  commentKarma: 400,
};

const mockUsers: User[] = [
  mockCurrentUser,
  {
    id: '2',
    username: 'desperate_student_23',
    displayName: 'u/desperate_student_23',
    bio: 'CSE Final Year | Aspiring SDE',
    avatar: '🎓',
    karma: 450,
    cakeDay: 'Sep 10, 2023',
    postKarma: 300,
    commentKarma: 150,
  },
  {
    id: '3',
    username: 'amazon_sde_2021',
    displayName: 'u/amazon_sde_2021',
    bio: 'SDE at Amazon | Here to help juniors',
    avatar: '💼',
    karma: 5600,
    cakeDay: 'Mar 5, 2021',
    postKarma: 3200,
    commentKarma: 2400,
  },
];

const initialState: UserState = {
  currentUser: mockCurrentUser,
  users: mockUsers,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<{ bio: string; avatar: string }>) => {
      state.currentUser.bio = action.payload.bio;
      state.currentUser.avatar = action.payload.avatar;
    },
    updateKarma: (state, action: PayloadAction<{ type: 'post' | 'comment'; amount: number }>) => {
      const { type, amount } = action.payload;
      state.currentUser.karma += amount;
      if (type === 'post') {
        state.currentUser.postKarma += amount;
      } else {
        state.currentUser.commentKarma += amount;
      }
    },
  },
});

export const { updateProfile, updateKarma } = userSlice.actions;
export default userSlice.reducer;