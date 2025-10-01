import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

export const FilterInput = ({ onFilterChange }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setFilterValue(value); 
    if (onFilterChange) {
            console.log(value)

      onFilterChange(value); 
    }
  };

  const handleClear = () => {
    setFilterValue('');
    if (onFilterChange) {
      onFilterChange('');
    }
  };

  return (
    <Tooltip title="Filter list" sx={{alignSelf:'stretch'}}>
        
      <FormControl
        sx={{
          m: 0,
          maxHeight: '35px',
          width: '35vw',
          position: 'relative',
          right: 0,
          padding: 0
        }}
        variant="outlined"
      >
        
        <OutlinedInput
          sx={{
            m: 0,
            maxHeight: '35px',
            '& .MuiOutlinedInput-input': {
              padding: '8px',
              height: '35px',
              boxSizing: 'border-box',
            },
          }}
          id="outlined-adornment-filter"
          value={filterValue}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              {filterValue && (
                <IconButton
                  aria-label="clear filter"
                  onClick={handleClear}
                  edge="end"
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          }
          aria-describedby="outlined-filter-helper-text"
          inputProps={{
            'aria-label': 'filter',
          }}
        />
      </FormControl>
    </Tooltip>
  );
};