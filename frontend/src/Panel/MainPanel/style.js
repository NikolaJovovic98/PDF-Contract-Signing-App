import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   main : {
      // border : "3px solid green",
       margin : '10px',
       display : 'flex',
       flexDirection : 'column',
       justifyContent : 'center',
       alignItems : 'center',
       gap : '20px'
   },
   main_selected_option : {
     // border : '2px solid red',
      width : '90vw'
   }
}));

