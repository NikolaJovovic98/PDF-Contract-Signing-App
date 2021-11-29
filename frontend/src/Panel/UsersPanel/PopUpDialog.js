import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles, TextField, Grid, Typography, Container, Avatar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { add_new_user_action } from '../../actions/users_action';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '70%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    },
    submit: {
        border: '2px solid black'
    }
}));

const initial_user_data = {
    email: '',
    password: ''
};

export default function PopUpDialog({ show, setShow, add_user_error }) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
    };

    const [userData, setUserData] = React.useState(initial_user_data);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(add_new_user_action(userData));
        setUserData(initial_user_data);
    };

    const handleFormChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <Dialog
                open={show}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>

                    <Container className={classes.test} component="main" maxWidth="xs">
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                {/* <LockOutlinedIcon /> */} A
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Dodaj Korisnika
                            </Typography>

                            {
                                typeof add_user_error !== 'undefined'
                                ?
                                <Alert severity="error" style={{ margin: "10px" }} >
                                    <AlertTitle>Greška</AlertTitle>
                                    Email zauzet
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
                                            label="Email Adresa"
                                            name="email"
                                            type="email"
                                            value={userData.email}
                                            onChange={handleFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Šifra"
                                            type="password"
                                            id="password"
                                            inputProps={{
                                                minLength: 6
                                            }}
                                            value={userData.password}
                                            onChange={handleFormChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        margin: 'auto',
                                        marginTop: '15px',
                                    }}
                                >
                                    Dodaj
                                </Button>
                            </form>
                        </div>
                    </Container>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="warning">
                        Zatvori
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}