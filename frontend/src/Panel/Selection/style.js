import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   select : {
    //border : '3px solid blue',
       borderRadius : '8px',
       margin : 'auto',
       marginTop : '1%',
       padding : '6px',
       width : '100%',
       backgroundColor : '#ECEAE0',
       [theme.breakpoints.down('sm')] : {
         width : '100%'
     }
   }
}));

