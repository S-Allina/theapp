import React from 'react';
import { Table, TableBody, TableContainer } from '@mui/material';
import { EnhancedTableHead } from './EnhancedTableHead';
import UserRow from './UserRow';

const UsersTable = ({
  visibleRows,
  selectedUsers,
  order,
  orderBy,
  onRequestSort,
  onSelectAllClick,
  onUserClick
}) => {
  return (
    <TableContainer sx={{ overflowY: 'scroll', maxHeight: '80vh' }}>
      <Table sx={{ minWidth: '60%' }} aria-labelledby="tableTitle" size={'medium'}>
        <EnhancedTableHead
          numSelected={selectedUsers.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={onSelectAllClick}
          onRequestSort={onRequestSort}
          rowCount={visibleRows.length}
        />
        <TableBody sx={{overflowY: 'scroll', maxHeight:'30vh'}}>
          {visibleRows.map((row, index) => {
            const isItemSelected = selectedUsers.includes(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <UserRow
                key={row.id}
                row={row}
                isItemSelected={isItemSelected}
                labelId={labelId}
                onUserClick={onUserClick}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(UsersTable);