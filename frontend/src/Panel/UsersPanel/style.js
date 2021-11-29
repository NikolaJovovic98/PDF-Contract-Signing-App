import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   users : {
       //border : '3px solid blue',
       width : '80%',
       margin : 'auto',
       [theme.breakpoints.down('sm')] : {
        padding : '0px',
        width : '97%'
    }
   },
   loading : {
        width : '20%',
        margin : 'auto',
        textAlign : 'center'
   },
   add_new_user : {
       display : 'flex',
       flexDirection : 'row',
       alignItems : 'center',
       padding : '8px'
   }
}));

