import { format, formatDistanceToNow } from 'date-fns';
import { Tooltip, Typography } from '@mui/material';
export const TimeAgo = ({ dateString, ...props }) => {
  if (!dateString) {
    return (
      <Typography variant="body2" {...props}>
        Never active
      </Typography>
    );
  }

  const date = new Date(dateString);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  const fullDate = format(date, 'MMMM dd, yyyy HH:mm:ss');

  return (
    <Tooltip title={fullDate} arrow placement="top">
      <Typography variant="body2" {...props}>
        {timeAgo}
      </Typography>
    </Tooltip>
  );
};