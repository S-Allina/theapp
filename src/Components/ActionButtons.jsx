import { Tooltip, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';

export const ActionButtons = ({
  numSelected,
  selectedUsers,
  onBlock,
  onUnblock,
  onDelete,
  onDeleteUnverify,
}) => {
  return (
    <>
      <Tooltip
        title="Block selected users"
        sx={{ mr: 0.625, width: '10%', fontSize: '0.6rem', alignSelf: 'stretch' }}
      >
        <Button
          variant="outlined"
          sx={{ mr: 0.625, width: '10%', fontSize: '0.6rem' }}
          onClick={onBlock}
          disabled={selectedUsers.length === 0}
        >
          <LockIcon sx={{ mr: 0.625 }} />
          Block ({numSelected})
        </Button>
      </Tooltip>

      <Tooltip title="Unblock selected users" sx={{ alignSelf: 'stretch' }}>
        <Button
          variant="outlined"
          sx={{ mr: 0.625, width: '10%' }}
          onClick={onUnblock}
          disabled={selectedUsers.length === 0}
        >
          <LockOpenIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Delete selected users" sx={{ alignSelf: 'stretch' }}>
        <Button
          variant="outlined"
          color="error"
          onClick={onDelete}
          sx={{ mr: 0.625, width: '10%', fontSize: '0.5rem' }}
          disabled={selectedUsers.length === 0}
        >
          <DeleteIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Delete unverify users" sx={{ alignSelf: 'stretch' }}>
        <Button
          variant="outlined"
          color="error"
          onClick={onDeleteUnverify}
          sx={{ mr: 0.625, width: '10%', fontSize: '0.5rem' }}
        >
          <UnsubscribeIcon sx={{ mr: 0.625 }} />
        </Button>
      </Tooltip>
    </>
  );
};
