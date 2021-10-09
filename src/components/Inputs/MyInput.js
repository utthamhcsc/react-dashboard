import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Select, { components } from 'react-select';
import useToggle from '../../hooks/useToggle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
export function MyInput({ label, mandatory = false, ...other }) {
  return (
    <Box mb={1}>
      <Typography
        gutterBottom
        style={{
          textTransform: 'capitalize',
          fontWeight: '500',
          fontSize: '14px',
        }}
      >
        {label}
        {mandatory && (
          <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        )}
      </Typography>
      <TextField
        size="small"
        variant="outlined"
        color="primary"
        fullWidth
        {...other}
      />
    </Box>
  );
}
export function MyPassword({ label, mandatory = false, ...other }) {
  const [showPassword, setShowPassword] = useToggle();
  return (
    <Box mb={1}>
      <Typography
        gutterBottom
        style={{
          textTransform: 'capitalize',
          fontWeight: '500',
          fontSize: '14px',
        }}
      >
        {label}
        {mandatory && (
          <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        )}
      </Typography>
      <TextField
        type={showPassword ? 'text' : 'password'}
        size="small"
        variant="outlined"
        color="primary"
        fullWidth
        InputProps={{
          endAdornment: (
            <span onClick={setShowPassword} style={{ cursor: 'pointer' }}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          ),
        }}
        {...other}
      />
    </Box>
  );
}

const mystyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '&>*': { margin: '0 20px', textAlign: 'right', minWidth: '100px' },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      '&>*': { marginBottom: '3px', textAlign: 'left' },
    },
  },
}));
export function MyInput1({ label, ...other }) {
  const classes = mystyles();
  return (
    <Box mb={1} className={classes.root}>
      <Typography>{label + ':'}</Typography>
      <TextField
        size="small"
        variant="outlined"
        color="primary"
        fullWidth
        {...other}
      />
    </Box>
  );
}

export function Submit({ text, ...other }) {
  return (
    <Button type="submit" variant="contained" {...other}>
      {text}
    </Button>
  );
}

const customStyles = (myTheme) => ({
  option: (provided, state) => ({
    ...provided,
    zIndex: 9999,
    textAlign: 'left',
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  control: (base, state) => ({
    ...base,
    backgroundColor: myTheme.palette.background.paper,
    color: myTheme.palette.type == 'dark' ? '#fff' : '#000',

    // borderLeft: 0,
    // borderRight: 0,
    // borderTop: 0,
    // borderRadius: 0,
    // outline: 0,
    '&:hover': {
      border: '1px solid black',
      // borderLeft: 0,
      // borderRight: 0,
      // borderTop: 0,
      // borderRadius: 0,
      // outline: 0,
    },
    '&:focus': {
      border: '1px solid black',
      // borderLeft: 0,
      // borderRight: 0,
      // borderTop: 0,
      // borderRadius: 0,
      // outline: 0,
    },
  }),
});

export function MySelect({ label, mandatory = true, ...props }) {
  const myTheme = useTheme();
  const classes = mystyles();
  return (
    <Box mb={1}>
      <Typography
        gutterBottom
        style={{
          textTransform: 'uppercase',
          fontWeight: '600',
          fontSize: '12px',
        }}
      >
        {label}
        {mandatory && (
          <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        )}
      </Typography>
      <Box flex={1}>
        <Select
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: myTheme.palette.primary.main,
            },
            backgroundColor: myTheme.palette.background.paper,
          })}
          isClearable={true}
          styles={customStyles(myTheme)}
          {...props}
          menuPortalTarget={window?.document?.body}
        />
      </Box>
    </Box>
  );
}
