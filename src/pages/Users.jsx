import { useEffect, useState, useMemo, useCallback } from 'react';
import { Box, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUsersQuery } from '../services/usersApi';
import {
  setUsers,
  setSelectedUsers,
  toggleUserSelection,
  selectAllUsers,
} from '../slices/usersSlice';
import UsersToolbar from '../Components/UsersToolbar';
import UsersTable from '../Components/UsersTable';
import { setTheme } from '../slices/authSlice';
import urls from '../../url';

const generateChartData = () => {
  return Array.from({ length: 8 }, () => Math.floor(Math.random() * 7) + 1);
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
export default function Users() {
  const selectedUsers = useSelector((state) => state.users.selectedUsers);
  const [filterValue, setFilterValue] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const { data: users = [] } = useGetUsersQuery();
  const dispatch = useDispatch();

  const handleRequestSort = useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy],
  );

  const handleSelectAllClick = useCallback(
    (event) => {
      if (event.target.checked) {
        dispatch(selectAllUsers());
      } else {
        dispatch(setSelectedUsers([]));
      }
    },
    [dispatch],
  );

  const handleUserClick = useCallback(
    (event, id) => {
      dispatch(toggleUserSelection(id));
    },
    [dispatch],
  );

  const handleSelectionClear = useCallback(() => {
    dispatch(setSelectedUsers([]));
  }, [dispatch]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(`${urls.AUTH}/api/auth/check-auth`, {
          credentials: 'include',
        });
        if (!response.ok) {
          window.location.href =
            `${urls.AUTH}/Account/Login?returnUrl=/connect/authorize?client_id=MainMVCApp&redirect_uri=${urls.MAIN}/signin-oidc&response_type=code&scope=openid profile email api1`;
        } else {
          const authData = await response.json();
          dispatch(setTheme(authData?.theme || 'light'));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuthentication();
  }, [dispatch]);

  const rows = useMemo(() => {
    console.log('users', users)
    return users.map((user) => ({
      id: user.id,
      Name: user.firstName + ' ' + user.lastName,
      Email: user.email,
      emailConfirmed: user.emailConfirmed,
      Status: user.status,
      role: user.role,
      chartData: generateChartData(),
    }));
  }, [users]);
  const filteredRows = useMemo(() => {
    if (!filterValue) return rows;

    return rows.filter((row) => {
      return Object.values(row).some((cellValue) =>
        String(cellValue).toLowerCase().includes(filterValue),
      );
    });
  }, [rows, filterValue]);

  const handleFilterChange = useCallback((value) => {
    const lowerCaseValue = value.toLowerCase();
    setFilterValue(lowerCaseValue);
  }, []);

  const visibleRows = useMemo(() => {
    return [...filteredRows].sort(getComparator(order, orderBy));
  }, [filteredRows, order, orderBy]);

  useEffect(() => {
    if (users.length > 0) {
      dispatch(setUsers(users));
    }
  }, [users, dispatch]);

  return (
    <div style={{ width: '95vw' }}>
      <Box sx={{ width: '80vw', m: 'auto' }}>
        <Paper sx={{ mb: 2 }}>
          {status !== 'Blocked' && (
            <UsersToolbar
              selectedUsers={selectedUsers}
              onSelectionClear={handleSelectionClear}
              onFilterChange={handleFilterChange}
            />
          )}
          <UsersTable
            visibleRows={visibleRows}
            selectedUsers={selectedUsers}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
            onUserClick={handleUserClick}
          />
        </Paper>
      </Box>
    </div>
  );
}
