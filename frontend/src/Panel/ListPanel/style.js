import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   list_main_div : {
       //border : '3px solid red'
   },
   table : {
    width : '100%',
    margin : 'auto'
   },
   dodaj : {
       display : 'flex',
       alignItems:'center',
       justifyContent : 'space-around',
       width : '15%',
       backgroundColor : 'wheat',
       borderRadius : theme.shape.borderRadius,
       padding : "4px",
       [theme.breakpoints.down('xs')] : {
        width : '70%',
    }
   }
}));

