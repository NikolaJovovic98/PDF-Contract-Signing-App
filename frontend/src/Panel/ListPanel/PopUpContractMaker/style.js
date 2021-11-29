import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    main_container : {
        //border : '2px solid black',
        width : "100%",
        display : 'grid',
        gridTemplateColumns : '1fr 2fr',
        gap : '10px',
        margin : 'auto',
        marginTop : '1%',
        [theme.breakpoints.down('xs')] : {
            display : 'flex',
            flexDirection : "column",
            width : "100%",
        }
    },
    form_div : {
        //border : '2px solid blue',
        padding : "15px",
        [theme.breakpoints.up('sm')] : {
            borderRight : '2px solid #bfbebb'
        },
        [theme.breakpoints.down('sm')] : {
            borderBottom : '2px solid #bfbebb'
        }
        
    },
    pdf_preview_div : {
        //border : '2px solid red',
        padding : "5px",
      //maxHeight : '100%vh',
        textAlign : 'center',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },
    pdf_document : {
        //border : '2px solid blue',
        margin : 'auto',
        // display : 'flex',
        // justifyContent : 'center',
        // alignItems : 'center',
        //width : '50%'
        float : 'left'
    },
    submit_button : {
        display : 'flex',
        justifyContent : 'center',
        marginTop : '3%'
    }
}));