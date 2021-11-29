import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux'
import { logout_action } from '../actions/users_action';
import { useNavigate } from 'react-router-dom';
import useStyle from './style';

export default function NavBarComponent({user,set_user_context}) {

  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
     dispatch(logout_action());
     navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" style={{backgroundColor:'#232B2B',color:'white'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PDF Potpisivanje
          </Typography>
          <Typography className={classes.email}>
              Dobrodošli { user.email }
          </Typography>
          <Button color="warning" variant="contained" onClick={handleLogout} >Odjava</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}