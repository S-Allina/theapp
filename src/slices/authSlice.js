import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import urls from '../../url';
const initialState = {
   isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  theme: 'dark',
};



export const checkAuth = createAsyncThunk('auth/checkAuth',
  async () => {
    try {
      const response = await fetch(`${urls.AUTH}/api/auth/check-auth`, {
        credentials: 'include',
      });

      if (response.ok) {
        const authData = await response.json();
        return authData;
      }
      
      return {
        isAuthenticated: false,
        user: null,
        theme: 'dark'
      };
    } catch (error) {
      console.error('Auth check failed:', error);
      return {
        isAuthenticated: false,
        user: null,
        theme: 'dark'
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
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
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
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message || 'Auth check failed';
      })     
  },
});

export const { login, logout, register, clearError, toggleTheme, setTheme, updateUser } = authSlice.actions;
export default authSlice.reducer;