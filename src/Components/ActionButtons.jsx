import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
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
  if (numSelected === 0) {
    return (
      <>
        <Tooltip title="Block" sx={{ alignSelf: 'stretch' }}>
          <Button
            variant="outlined"
            sx={{ mr: 0.625, width: '10%', fontSize: '0.5rem', alignSelf: 'stretch' }}
            disabled
          >
            <LockIcon sx={{ mr: 0.625 }} />
            Block
          </Button>
        </Tooltip>
        <Tooltip title="Unblock" sx={{ alignSelf: 'stretch' }}>
          <Button variant="outlined" sx={{ mr: 0.625 }} disabled>
            <LockOpenIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" sx={{ alignSelf: 'stretch' }}>
          <Button variant="outlined" color="error" disabled>
            <DeleteIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Delete selected users" sx={{ alignSelf: 'stretch' }}>
          <Button variant="outlined" color="error" onClick={onDeleteUnverify}>
            <UnsubscribeIcon sx={{ mr: 0.625 }} />
          </Button>
        </Tooltip>
      </>
    );
  }

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
          sx={{ mr: 0.625, width: '10%', fontSize: '0.5rem' }}
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
        >
          <DeleteIcon sx={{ mr: 0.625 }} />
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
