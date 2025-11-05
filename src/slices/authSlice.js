import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};



export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('email');

  if (email || userId) {
    return {
      isAuthenticated: true,
      user: {
        userId: userId
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
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.theme = action.payload;
      localStorage.setItem('userId', action.payload.id);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('theme', action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    register: () => {},
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
      
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
    },
    clearError: (state) => {
      state.error = null;
    }
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
      })      
  },
});

export const { login, logout, register, clearError, toggleTheme, setTheme } = authSlice.actions;
export default authSlice.reducer;