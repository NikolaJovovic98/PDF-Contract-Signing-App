import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    home_page_main_panel : {
        //border : '1px solid black',
        marginTop : '5%',
        [theme.breakpoints.down('sm')] : {
            marginTop : '24%',
            width : '100%',
        }
    }
}));

