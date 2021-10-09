import React from 'react';
import { Paper, Typography, IconButton, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useHistory } from 'react-router-dom';
import { controls } from '../../components/Inputs';
import { Routes } from '../../constants/Routes';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
function Login() {
  const initialValues = { username: '', password: '' };
  const Auth = useAuth();
  const history = useHistory();
  const { values, handleInputChange } = useForm(initialValues, false, {});
  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.login(values)
      .then((data) => {
        history.push('/admin');
      })
      .catch((err) => toast.error(err.message));
  };
  React.useEffect(() => {
    if (Auth.currentUser?.isAuthenticated) {
      history.push('/admin');
    }
  }, []);

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
          Sign In
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
          <controls.Submit text="Login" fullWidth={true} color="primary" />
          <Box my={2} />
          <Typography variant="subtitle1" color="GrayText" fontSize="14px">
            Don't Have Account?<Link to={Routes.REGISTER}> Register Here</Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
