import React from 'react';
import { Avatar, Button, TextField, Grid , Typography, Container, CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './style';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { login_action } from '../actions/users_action';


const initial_state = {
    email : "",
    password : ""
}

const LoginScreen = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ loginFormData, setLoginFormData ] = useState(initial_state); 

    const login_data = useSelector( state => state.login );
    const { loading, user_login, login_error } = login_data;

    const handleFormChange = (e)=>{
      setLoginFormData({
          ...loginFormData,
          [e.target.name] : e.target.value
      });
  };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch( login_action( loginFormData ) );
    };

    React.useEffect(()=>{
      if(user_login?.email){
        navigate('/');
      }
    },[user_login,navigate]);
    
    return (
        <Container className={classes.test} component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login 
          </Typography>

          {
              loading 
              ?
              <CircularProgress size="50px" />
              :
              null
          }

          {
            login_error
            ?
            <Alert severity="error" style={{margin:"10px"}} >
            <AlertTitle>Login Error</AlertTitle>
              {login_error}
            </Alert>
            :
            null
          }  


          <form className={classes.form} onSubmit={handleFormSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={loginFormData.email}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  inputProps={{
                     minLength: 6
                  }}
                  value={loginFormData.password}
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </div>  
      </Container>
    )
}

export default LoginScreen;
