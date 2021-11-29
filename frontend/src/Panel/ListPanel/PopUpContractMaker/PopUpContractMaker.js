import * as React from 'react';
import useStyle from './style';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { DialogContent, Grid, TextField, CircularProgress, Paper } from '@material-ui/core';
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initial_contract_data = {
    email: '',
    description: '',
    client_name: '',
    pdf_file: '',
};

export default function PopUpContractMaker({ show, setShow }) {

    const classes = useStyle();

    // const drawMarkerOnClick = (cursor_pdf_rectangle,e) => {
    //     const rect = cursor_pdf_rectangle.getBoundingClientRect();
    //     const x = e.clientX - rect.left;
    //     const y = e.clientY - rect.top;

    // };

    // const cursor_pdf_rectangle = document.getElementsByClassName('react-pdf__Page__canvas')[0];
    // cursor_pdf_rectangle?.addEventListener('click',(e)=>{
    //     drawMarkerOnClick(cursor_pdf_rectangle,e);
    // });

    const [contractData, setContractData] = React.useState(initial_contract_data);
    const [numOfPages, setNumOfPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sign_coordinates, set_sign_coordinates] = React.useState([]);
    const [file, setFile] = React.useState(null);

    const handleClose = () => {
        setContractData(initial_contract_data);
        set_sign_coordinates([]);
        setFile(null);
        setShow(false);
    };

    const handleFormChange = (e) => {
        setContractData({
            ...contractData,
            [e.target.name]: e.target.value
        });
    };

    const handleOnPdfLoad = (pdf_file) => {
        setNumOfPages(pdf_file._pdfInfo.numPages);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (JSON.stringify(contractData) !== '{}') {
            const formData = new FormData();
            formData.append('owner_email', contractData.email);
            formData.append('description', contractData.description);
            formData.append('client_name', contractData.client_name);
            formData.append('page_num_to_sign', currentPage);
            formData.append('sign_coordinates', sign_coordinates);
            formData.append('pdf_file', file);

            for (const entry of formData.entries()) {
                console.log(entry);
            }
        };
    };

    const setCoordinatesOnClick = (e) => {
        if (e.target.className === 'react-pdf__Page__canvas') {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const coordinates = [x, y];
            set_sign_coordinates([...coordinates]);

            console.log(coordinates);
            
            const marker = e.target.getContext("2d");
            marker.beginPath();
            marker.lineWidth = "3";
            marker.strokeStyle = "red";
            marker.strokeRect(x,y, 70, 50);
            marker.stroke();
        }
    }

    const makeSignature = () => {
        const kanv = document.getElementsByClassName('react-pdf__Page__canvas')[0];
        //console.log(sign_coordinates);
        //console.log(kanv);
        const marker = kanv.getContext("2d");
        marker.beginPath();
        marker.lineWidth = "3";
        marker.strokeStyle = "red";
        marker.strokeRect(sign_coordinates[0], sign_coordinates[1], 70, 50);
        marker.stroke();
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={show}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Dodaj Novi Ugovor
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent dividers>
                    <div className={classes.main_container}>

                        <div className={classes.form_div} >
                            <form onSubmit={handleFormSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoFocus
                                            name="email"
                                            variant="filled"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            value={contractData.email}
                                            onChange={handleFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="filled"
                                            required
                                            fullWidth
                                            multiline
                                            rows={3}
                                            id="description"
                                            label="Opis"
                                            name="description"
                                            value={contractData.description}
                                            onChange={handleFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="filled"
                                            required
                                            fullWidth
                                            name="client_name"
                                            label="Klijent"
                                            type="text"
                                            id="client_name"
                                            value={contractData.client_name}
                                            onChange={handleFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2">
                                            PDF dokument
                                        </Typography>
                                        <TextField
                                            variant="filled"
                                            required
                                            fullWidth
                                            name="pdf_file"
                                            type="file"
                                            id="pdf_file"
                                            inputProps={{ accept: "application/pdf" }}
                                            //value={registerFormData.confirmPassword}
                                            onChange={(e) => {
                                                //contractData.pdf_file = e.target.files[0];
                                                setFile(e.target.files[0]);
                                            }}
                                        //onChange={handlePdfPreview}
                                        //onChange={handlePdfUpload}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <Typography variant="caption">
                                            Broj stranica {numOfPages}
                                        </Typography>

                                        <TextField
                                            name="page_num_to_sign"
                                            variant="filled"
                                            label="Broj strane za potpis"
                                            fullWidth
                                            required
                                            type="number"
                                            //value={contractData.page_num_to_sign}
                                            value={currentPage}
                                            onChange={(e) => {
                                                setCurrentPage(parseInt(e.target.value, 10));
                                            }}
                                            disabled={!file ? true : false}
                                            InputProps={{
                                                inputProps: {
                                                    min: 1,
                                                    max: numOfPages
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.submit_button}>
                                    <Button color="primary" variant="contained" type="submit">
                                        Sačuvaj
                                    </Button>
                                </Grid>
                                <Button variant="outlined" style={{ margin: "20px" }} onClick={makeSignature}>
                                    MAKE SIGNATURE
                                </Button>
                            </form>
                        </div>

                        <div className={classes.pdf_preview_div}>
                            <Paper elevation={file ? 20 : 0}>
                                <Document
                                    className={classes.pdf_document}
                                    file={file}
                                    onLoadSuccess={handleOnPdfLoad}
                                    noData={<Typography variant="h6"> Izaberite Pdf dokument </Typography>}
                                    loading={<CircularProgress size="50px" />}
                                    error={<Typography variant="h6" color="red">Greška u fajlu</Typography>}
                                >
                                    <Page
                                        onClick={setCoordinatesOnClick}
                                        width={400}
                                        pageNumber={currentPage}>
                                    </Page>
                                </Document>
                            </Paper>
                        </div>

                    </div>

                </DialogContent>

            </Dialog>
        </div>
    );
}
