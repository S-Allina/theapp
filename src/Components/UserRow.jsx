import React from 'react';
import { TableRow, TableCell, Checkbox, Typography, Box } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { TimeAgo } from './TimeAgo';

const UserRow = ({ row, isItemSelected, labelId, onUserClick }) => {
  const handleClick = (event) => {
    onUserClick(event, row.id);
  };

  return (
    <TableRow
      hover
      onClick={handleClick}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
      sx={{
        cursor: 'pointer',
        textDecoration: row.Status === 'Blocked' ? 'line-through' : 'none',
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <div>
          <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
            {row.Name}
          </Typography>
          <Typography variant="body2" component="div" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            {row.profession}
          </Typography>
        </div>
      </TableCell>
      <TableCell align="right">{row.Email}</TableCell>
      <TableCell align="right">{row.Status}</TableCell>
      <TableCell align="right">
        {row.role}
      </TableCell>
    </TableRow>
  );
};

export default React.memo(UserRow);