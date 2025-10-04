import React, { useState } from 'react';
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
  const [alertError, setAlertError] = useState('');
  const navigate = useNavigate();

  const executeUserOperation = async (operation, onSuccess) => {
    try {
      await operation();
      if (onSuccess) onSuccess();
    } catch (error) {
      
      if (error.status === 500 && error.data?.ErrorMessages?.includes('Error. User not found')) {
        navigate('/login?error=Your account is delete');
      } else {
        const errorMessage =
          error.data?.DisplayMessage ||
          error.data?.ErrorMessages?.join(', ') ||
          'An error occurred';
        setAlertError(errorMessage);
      }
    }
  };

  const handleBlockUsers = async (userIds) => {
    await executeUserOperation(() => blockUsers(userIds).unwrap(), onSelectionClear);
  };
  const handleUnblockUsers = async (userIds) => {
    await executeUserOperation(() => unblockUsers(userIds).unwrap(), onSelectionClear);
  };

  const handleDeleteUsers = async (userIds) => {
    await executeUserOperation(() => deleteUsers(userIds).unwrap(), onSelectionClear);
  };

  const handleDeleteUnverifyUsers = async () => {
    await executeUserOperation(() => deleteUnverifyUsers().unwrap(), null);
  };

  return (
    <>
      <EnhancedTableToolbar
        numSelected={selectedUsers.length}
        selectedUsers={selectedUsers}
        onBlockUsers={handleBlockUsers}
        onUnblockUsers={handleUnblockUsers}
        onDeleteUsers={handleDeleteUsers}
        onDeleteUnverifyUsers={handleDeleteUnverifyUsers}
        onFilterChange={onFilterChange}
      />
      {alertError && (
        <Alert severity="error" sx={{ marginBottom: 2 }} onClose={() => setAlertError(null)}>
          {alertError}
        </Alert>
      )}
    </>
  );
};

export default React.memo(UsersToolbar);
