import React, { useState } from 'react';
import { AppBar, InputBase, makeStyles, Toolbar, Typography, alpha, Button } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout_action } from './actions/users_action';

const useStyle = makeStyles((theme)=>({
    toolbar : {
        display : 'flex',
        justifyContent : 'space-between',
        [theme.breakpoints.down('xs')] : {
            width : '93%'
        }
    },
    logoLg : {
        display : 'none',
        [theme.breakpoints.up('sm')] : {
            display : 'block'
        }
    },
    logoSm : {
        display : 'block',
        [theme.breakpoints.up('sm')] : {
            display : 'none'
        }
    },
    search : {
        display : 'flex',
        alignItems : 'center',
        padding : '5px',
        backgroundColor : alpha(theme.palette.common.white, 0.15),
        '&:hover' : {
            backgroundColor : alpha(theme.palette.common.white, 0.25)
        },
        borderRadius : theme.shape.borderRadius,
        width : '30%',
        [theme.breakpoints.down('xs')] : {
            width : '70%',
            display : (props) => (props.showSearch ? 'flex' : 'none')
        }
    },
    input : {
        color : 'white',
        marginLeft : theme.spacing(1)
    },
    searchButton : {
        marginRight : theme.spacing(2),
        [theme.breakpoints.up('sm')] : {
            display : 'none !important;'
        },
        cursor : 'pointer',
    },
    icons : {
        display : 'flex',
        alignItems : 'center',
        width : "20%",
        justifyContent : 'space-between',
        [theme.breakpoints.down('xs')] : {
            width : '60%',
            display : (props) => (props.showSearch ? 'none' : 'flex')
        }
    },
    info : {
        display : 'none',
        [theme.breakpoints.up('md')] : {
            display : 'flex'
        }
    },
    cancel : {
        cursor : 'pointer',
        [theme.breakpoints.up('sm')] : {
            display : "none !important"
        }
    }
}));

const NavBar = ({user,set_user_context}) => {

    const [ showSearch, setShowSearch ] = useState(false);

    const classes = useStyle({ showSearch });

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
       dispatch(logout_action());
       set_user_context({});
       navigate('/');
    };

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <Typography  variant="h6" className={classes.logoLg}>
                    PDF Digitalni Potpis
                </Typography>
                <Typography  variant="h6" className={classes.logoSm}>
                    PDFDP
                </Typography>
                <div className={classes.search}>
                    <SearchIcon/>
                    <InputBase 
                        placeholder="Pretraži ugovore"
                        className={classes.input}/>
                    <CancelIcon
                        className={classes.cancel}
                        onClick={()=>{
                            setShowSearch(false);
                        }}/>
                </div>
                <div className={classes.icons}>
                   <SearchIcon
                    className={classes.searchButton} 
                    onClick={()=>{ setShowSearch(true); }}/>
                    <AccountCircleIcon />
                    <Typography className={classes.info}>
                        {user.email}
                    </Typography>
                    <Button 
                     variant="contained"
                     color="secondary"
                     onClick={handleLogout}>
                        ODJAVA
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;
