import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  selectedUsers: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
    },
    toggleUserSelection: (state, action) => {
      const userId = action.payload;
      const selectedIndex = state.selectedUsers.indexOf(userId);
      
      if (selectedIndex === -1) {
        state.selectedUsers.push(userId);
      } else {
        state.selectedUsers.splice(selectedIndex, 1);
      }
    },
    selectAllUsers: (state) => {
      const allUserIds = state.users.map(user => user.id);
      if (state.selectedUsers.length === allUserIds.length) {
        state.selectedUsers = [];
      } else {
        state.selectedUsers = allUserIds;
      }
    },
  },
});

export const { 
  setUsers, 
  setLoading, 
  setError, 
  setSelectedUsers, 
  toggleUserSelection, 
  selectAllUsers 
} = usersSlice.actions;

export default usersSlice.reducer;