import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: localStorage.getItem('Status') !== 'Blocked',
  user: {
    userId: localStorage.getItem('Id') || null,
    userName: localStorage.getItem('userName') || null,
    email: localStorage.getItem('userEmail') || null,
    status: localStorage.getItem('status') || null,
    emailConfirmed: localStorage.getItem('emailConfirmed') || null,
  },
  isLoading: false,
  error: null,
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const userId = localStorage.getItem('Id');
  const status = localStorage.getItem('status');

  if (userId && status != 'Blocked') {
    return {
      isAuthenticated: true,
      user: {
        userId: userId,
        userName: localStorage.getItem('userName') || null,
        email: localStorage.getItem('userEmail') || null,
        status: localStorage.getItem('status') || null,
        emailConfirmed: localStorage.getItem('emailConfirmed') || null,
      },
    };
  } else {
    return {
      isAuthenticated: false,
      user: null,
    };
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = action.payload.status !== 'Blocked';
      state.user = {
        userId: action.payload.Id,
        userName: action.payload.userName,
        email: action.payload.email,
        status: action.payload.status,
        emailConfirmed: action.payload.emailConfirmed,
      };
      localStorage.setItem('emailConfirmed', action.payload.emailConfirmed);
      localStorage.setItem('Id', action.payload.Id);
      localStorage.setItem('userName', action.payload.userName);
      localStorage.setItem('userEmail', action.payload.email);
      localStorage.setItem('status', action.payload.status);
    },
    register: () => {
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        userId: null,
        userName: null,
        email: null,
        status: null,
        emailConfirmed: null,
      };
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem('emailConfirmed');
      localStorage.removeItem('Id');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('status');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
