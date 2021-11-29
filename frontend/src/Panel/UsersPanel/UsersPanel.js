import React, { useState } from 'react';
import useStyle from './style';
import {
    TableCell, TableRow, TableBody,
    TableContainer, TableHead, Table, Paper, CircularProgress, Button, Typography
} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { get_users_action, remove_user_action } from '../../actions/users_action';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PopUpDialog from './PopUpDialog';

const UsersPanel = () => {

    const dispatch = useDispatch();

    const classes = useStyle();

    const [ showPopUpDialog, setShowPopUpDialog ] = useState(false);

    const all_users_data = useSelector(state => state.get_users);
    const { loading, all_users, all_users_error } = all_users_data;

    React.useEffect(() => {
        dispatch(get_users_action());
    }, [dispatch]);

    const handleRemoveUser = (id) => {
        dispatch(remove_user_action(id));
    };

    const handlePopUpDialog = () => {
        setShowPopUpDialog(true);
    }

    const DisplayTable = () => {
        return (
            <>
                {
                    typeof all_users !== 'undefined'
                        ?
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Email adresa korisnika</strong></TableCell>
                                        <TableCell align="center"><strong>Administrator</strong></TableCell>
                                        <TableCell align="center"><strong>Izbriši</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {all_users?.map((user,index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {user.email}
                                            </TableCell>

                                            <TableCell align="center">
                                                {
                                                    user.is_admin
                                                    ?
                                                    <DoneIcon />
                                                    :
                                                    <CloseIcon/>
                                                }
                                            </TableCell>

                                            <TableCell align="center">
                                                <Button 
                                                    onClick={()=>{handleRemoveUser(user._id)}}
                                                    disabled={ user.is_admin }>
                                                  <DeleteIcon style={{ cursor: 'pointer' }}  />
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                                
                            </Table>
                            <div className={classes.add_new_user}>
                            <Typography>
                                <strong>Kliknite za dodavanje novog korisnika</strong>
                            </Typography>
                            <Button onClick={handlePopUpDialog}>
                             <AddBoxIcon/>
                            </Button>
                            </div>
                        </TableContainer>
                        :
                        null
                }
            </>
        )
    }

    return (
        <div className={classes.users}>

            <PopUpDialog 
                show={showPopUpDialog} 
                setShow={setShowPopUpDialog}
                add_user_error={all_users_error} />

            {

                loading
                    ?
                    <div className={classes.loading}>
                        <CircularProgress size={150} />
                    </div>
                    :
                    <DisplayTable />
            }
        </div>
    )
}

export default UsersPanel;
