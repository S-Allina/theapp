import React from 'react';
import { EnhancedTableToolbar } from '../Components/EnhancedTableToolbar';
import {
  useBlockUsersMutation,
  useUnblockUsersMutation,
  useDeleteUsersMutation,
  useDeleteUnverifyUsersMutation,
} from '../services/usersApi';
import { useNavigate } from 'react-router-dom';
const UsersToolbar = ({ selectedUsers, onSelectionClear, onFilterChange }) => {
  const [blockUsers] = useBlockUsersMutation();
  const [unblockUsers] = useUnblockUsersMutation();
  const [deleteUsers] = useDeleteUsersMutation();
  const [deleteUnverifyUsers] = useDeleteUnverifyUsersMutation();
  const navigate = useNavigate();
  const handleBlockUsers = async (userIds) => {
    try {
      await blockUsers(userIds).unwrap();
      onSelectionClear();
    } catch (error) {
      console.log('Failed to block users:', error);
       console.log(error.data.errormessages[0])
      if (error.status == 500 && error.data.errormessages[0]=='Error. User not found')
        console.log(error.data.errormessages[0])
        navigate('/login?error=Your account is delete');
    }
  };

  const handleUnblockUsers = async (userIds) => {
    try {
      await unblockUsers(userIds).unwrap();
      onSelectionClear();
    } catch (error) {
      console.log('Failed to unblock users:', error);
       console.log(error.data.errormessages[0])
      if (error.status == 500 && error.data.errormessages[0]=='Error. User not found')
        console.log(error.data.errormessages[0])
        navigate('/login?error=Your account is delete');
    }
  };

  const handleDeleteUsers = async (userIds) => {
    try {
      await deleteUsers(userIds).unwrap();
      onSelectionClear();
    } catch (error) {
      console.log('Failed to delete users:', error);
       console.log(error.data.errormessages[0])
      if (error.status == 500 && error.data.errormessages[0]=='Error. User not found')
        console.log(error.data.errormessages[0])
        navigate('/login?error=Your account is delete');
    }
  };

  const handleDeleteUnverifyUsers = async () => {
    try {
      await deleteUnverifyUsers().unwrap();
    } catch (error) {
      console.log('Failed to delete users:', error);
              console.log(error.data.errormessages[0])
      if (error.status == 500 && error.data.errormessages[0]=='Error. User not found')
        console.log(error.data.errormessages[0])
        navigate('/login?error=Your account is delete');
    }
  };

  return (
    <EnhancedTableToolbar
      numSelected={selectedUsers.length}
      selectedUsers={selectedUsers}
      onBlockUsers={handleBlockUsers}
      onUnblockUsers={handleUnblockUsers}
      onDeleteUsers={handleDeleteUsers}
      onDeleteUnverifyUsers={handleDeleteUnverifyUsers}
      onFilterChange={onFilterChange}
    />
  );
};

export default React.memo(UsersToolbar);
