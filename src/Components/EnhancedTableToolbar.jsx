import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { ActionButtons } from './ActionButtons';
import { FilterInput } from './FilterInput';
import { SnackbarManager } from './SnackbarManager';

export function EnhancedTableToolbar(props) {
  const {
    numSelected,
    selectedUsers,
    onBlockUsers,
    onUnblockUsers,
    onDeleteUsers,
    onFilterChange,
    onDeleteUnverifyUsers,
    onPromoteToAdmin,
    onDemoteToUser, 
  } = props;

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleBlock = async () => {
    if (selectedUsers.length === 0) return;
    try {
      await onBlockUsers(selectedUsers);
      showSnackbar(`Successfully blocked users`, 'success');
    } catch (error) {
      showSnackbar('Failed to block users', error);
    }
  };

  const handleUnblock = async () => {
    if (selectedUsers.length === 0) return;
    try {
      await onUnblockUsers(selectedUsers);
      showSnackbar(`Successfully unblocked ${selectedUsers.length} user(s)`);
    } catch (error) {
      showSnackbar('Failed to unblock users', error);
    }
  };

  const handleDelete = async () => {
    if (selectedUsers.length === 0) return;
    try {
      await onDeleteUsers(selectedUsers);
      showSnackbar(`Successfully deleted ${selectedUsers.length} user(s)`);
    } catch (error) {
      showSnackbar('Failed to delete users', error);
    }
  };

  const handleDeleteUnverifyUsers = async () => {
    try {
      await onDeleteUnverifyUsers();
      showSnackbar(`Successfully deleted unverify user(s)`);
    } catch (error) {
      showSnackbar('Failed to delete nverify users', error);
    }
  };
const handlePromoteToAdmin = async () => {
    if (selectedUsers.length === 0) return;
    try {
      await onPromoteToAdmin(selectedUsers);
      showSnackbar(`Successfully promoted ${selectedUsers.length} user(s) to admin`, 'success');
    } catch (error) {
      showSnackbar('Failed to promote users to admin', error);
    }
  };

  const handleDemoteToUser = async () => {
    if (selectedUsers.length === 0) return;
    try {
      await onDemoteToUser(selectedUsers);
      showSnackbar(`Successfully demoted ${selectedUsers.length} user(s) to regular user`, 'success');
    } catch (error) {
      showSnackbar('Failed to demote users', error);
    }
  };
  return (
    <>
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            maxHeight: '20%',
            gap: '10px',
            flexWrap: 'wrap',
          },
        ]}
      >
        <ActionButtons
          numSelected={numSelected}
          selectedUsers={selectedUsers}
          onBlock={handleBlock}
          onUnblock={handleUnblock}
          onDelete={handleDelete}
          onDeleteUnverify={handleDeleteUnverifyUsers}
          onPromoteToAdmin={handlePromoteToAdmin}
          onDemoteToUser={handleDemoteToUser} 
        />
        <FilterInput onFilterChange={onFilterChange} />
      </Toolbar>
      <SnackbarManager snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
}
