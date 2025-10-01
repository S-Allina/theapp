import { Snackbar, Alert } from '@mui/material';

export const SnackbarManager = ({ snackbar, onClose }) => {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert onClose={onClose} severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};