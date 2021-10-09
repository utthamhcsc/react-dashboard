import React from 'react';
import { Search, Add as AddIcon } from '@mui/icons-material';
import { Box, InputAdornment, Toolbar } from '@mui/material';
import { MyInput } from '../Inputs/MyInput';
export default ({ filter, setFilter, classes, add }) => {
  return (
    <Toolbar variant="dense" style={{ marginTop: '8px' }}>
      <MyInput
        placeholder="Search Here..."
        value={filter || ''}
        size={'small'}
        mandatory={false}
        onChange={(e) => setFilter(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Box flex="1" />
      {add}
    </Toolbar>
  );
};
