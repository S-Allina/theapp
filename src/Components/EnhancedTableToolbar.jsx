import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import { ActionButtons } from './ActionButtons';
import { FilterInput } from './FilterInput';
import { SnackbarManager } from './SnackbarManager';

export function EnhancedTableToolbar(props) {
  const { numSelected, selectedUsers, onBlockUsers, onUnblockUsers, onDeleteUsers, onFilterChange, onDeleteUnverifyUsers } = props;
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
      if (error.message.includes('already blocked')) {
        showSnackbar(error.message, 'warning');
      } else {
        showSnackbar('Failed to block users', 'error');
      }
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
      console.log('selectedUsers '+selectedUsers);
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
            maxHeight:'20%',
            gap:'10px',
            flexWrap:'wrap'
          },
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
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
        />
        
        <FilterInput onFilterChange={onFilterChange}/>
      </Toolbar>

      <SnackbarManager snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
}