import React from 'react';
import useStyle from './style';
import { useState } from 'react';
import {
    TableCell, TableRow, TableBody,
    TableContainer, TableHead, Table, Paper, Tooltip, Typography
} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PopUpContractMaker from './PopUpContractMaker/PopUpContractMaker';

const all_users = [
    {
        email: 'dzonna@gmail.com',
        is_admin: false
    },
    {
        email: 'dzonna@gmail.com',
        is_admin: false
    },
    {
        email: 'dzonna@gmail.com',
        is_admin: false
    },
    {
        email: 'dzonna@gmail.com',
        is_admin: false
    },
    {
        email: 'dzonna@gmail.com',
        is_admin: false
    },
    {
        email: 'dzonna@gmail.com',
        is_admin: false
    },
]

const ListPanel = () => {

    const classes = useStyle();

    const [ showPopUpContractMaker, setShowPopUpContractMaker ] = useState(false);
    
    const handlePopUpContractMaker = () => {
        setShowPopUpContractMaker(true);
    };


    return (
        <>

        <PopUpContractMaker
            show={showPopUpContractMaker}
            setShow={setShowPopUpContractMaker}/>

        <TableContainer className={classes.table} component={Paper}>
        <Typography className={classes.dodaj}>
            Dodaj novi ugovor <AddBoxIcon onClick={handlePopUpContractMaker} style={{cursor:'pointer'}}/>
        </Typography>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell align="left"><strong>Opis</strong></TableCell>
                        <TableCell align="center"><strong>Klijent</strong></TableCell>
                        <TableCell padding="checkbox" align="center"><strong>Link</strong></TableCell>
                        <TableCell padding="checkbox" align="center"><strong>Edit</strong></TableCell>
                        <TableCell padding="checkbox" align="center"><strong>Delete</strong></TableCell>
                        <TableCell padding="checkbox" align="center"><strong>Skini</strong></TableCell>
                        <TableCell align="center"><strong>Potpisan</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {all_users?.map((user, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover
                        >
                            <TableCell align="left">
                                {user.email}
                            </TableCell>

                            <TableCell align="left">
                                Ugovor o radu za stalno zaposlenog
                            </TableCell>

                            <TableCell align="center">
                                Nikola Jovovic
                            </TableCell>

                            <TableCell align="center">
                                <Tooltip title="Link Ugovora">
                                    <LinkIcon style={{ cursor: 'pointer' }} />
                                </Tooltip>
                            </TableCell>

                            <TableCell align="center">
                                <Tooltip title="Izmijeni Ugovor">
                                    <EditIcon style={{ cursor: 'pointer' }} color="primary" />
                                </Tooltip>
                            </TableCell>

                            <TableCell align="center">
                            <Tooltip title="Izbriši Ugovor">
                                <DeleteIcon style={{ cursor: 'pointer' }} color="error" />
                                </Tooltip>
                            </TableCell>

                            <TableCell align="center">
                            <Tooltip title="Skini PDF">
                                <DownloadIcon style={{ cursor: 'pointer' }} />
                            </Tooltip>
                            </TableCell>

                            <TableCell align="center">
                                {
                                    index % 2 === 0
                                        ?
                                        <Tooltip title="Potpisan Ugovor">
                                        <DoneIcon color="success" />
                                        </Tooltip>
                                        :
                                        <Tooltip title="Nepotpisan Ugovor">
                                        <CloseIcon color="warning" />
                                        </Tooltip>
                                }
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
        </>
    )
}

export default ListPanel;
