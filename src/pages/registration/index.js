import React from 'react';
import { Paper, Typography, IconButton, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { controls } from '../../components/Inputs';
import { Routes } from '../../constants/Routes';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

function Register() {
  const initialValues = { userName: '', password: '', roles: ['user'] };
  const Auth = useAuth();
  const history = useHistory();
  const { values, handleInputChange } = useForm(initialValues, false, {});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password == values.confirmPassword) {
      Auth.register(values)
        .then((data) => {
          history.push('/admin');
        })
        .catch((err) => toast.error(err.message));
    } else {
      toast.error('password and confirm password should match');
    }
  };

  return (
    <div className="grid place-items-center bg-aliceblue vh-100 vw-100">
      <Paper variant="outlined" style={{ width: '300px', padding: '20px' }}>
        <Typography
          variant="h5"
          color="initial"
          className="flex align-items-center justify-center"
        >
          <IconButton>
            <LockIcon color="secondary" fontSize="large" />
          </IconButton>{' '}
          Sign Up
        </Typography>
        <Box my={3} />
        <form onSubmit={handleSubmit}>
          <controls.MyInput
            label="User Name"
            name="userName"
            value={values.userName}
            onChange={handleInputChange}
          />
          <controls.MyPassword
            label="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
          <controls.MyPassword
            label="confirm password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleInputChange}
          />
          <controls.Submit text="Register" fullWidth={true} color="primary" />
          <Box my={2} />
          <Typography variant="subtitle1">
            <Link to={Routes.LOGIN}> Already Have Account?</Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
}

export default Register;
