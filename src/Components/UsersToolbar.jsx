import React from 'react';
import { EnhancedTableToolbar } from '../Components/EnhancedTableToolbar';
import { useBlockUsersMutation, useUnblockUsersMutation, useDeleteUsersMutation, useDeleteUnverifyUsersMutation } from '../services/usersApi';

const UsersToolbar = ({ selectedUsers, onSelectionClear, onFilterChange }) => {
  const [blockUsers] = useBlockUsersMutation();
  const [unblockUsers] = useUnblockUsersMutation();
  const [deleteUsers] = useDeleteUsersMutation();
  const [deleteUnverifyUsers] = useDeleteUnverifyUsersMutation();

  const handleBlockUsers = async (userIds) => {
    try {
      await blockUsers(userIds).unwrap();
      onSelectionClear();
    } catch (error) {
      console.error('Failed to block users:', error);
      throw error;
    }
  };
  
    const handleUnblockUsers = async (userIds) => {
      try {
        await unblockUsers(userIds).unwrap();
      } catch (error) {
        console.error('Failed to unblock users:', error);
        throw error;
      }
    };
  
    const handleDeleteUsers = async (userIds) => {
      try {
        console.log(userIds)
       await deleteUsers(userIds).unwrap();
      } catch (error) {
        console.error('Failed to delete users:', error);
        throw error;
      }
    };

    const handleDeleteUnverifyUsers = async () => {
      try {
       await deleteUnverifyUsers().unwrap();
      } catch (error) {
        console.error('Failed to delete users:', error);
        throw error;
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