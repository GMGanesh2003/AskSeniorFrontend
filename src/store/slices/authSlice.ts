import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  regNo: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'ALUMNI' | 'FACULTY';
  currentYear: string;
  college: string;
  branchOfStudy: string;
  graduationYear: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

const getCurrentUser = async () => {
  const userRequest = await fetch("https://askseniorbackend.onrender.com/api/v1/auth/current", {
    method: "GET",
    credentials: "include",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
  const userResp = await userRequest.json()
  console.log(userResp);

  if (userResp.error) {
    return null;
  }

  localStorage.setItem("currentUser", JSON.stringify(userResp));
  return JSON.stringify(userResp);
}

const storedUser = await getCurrentUser();

const initialState: AuthState = {
  isAuthenticated: !!storedUser,
  user: storedUser ? JSON.parse(storedUser) : null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("currentUser");
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;