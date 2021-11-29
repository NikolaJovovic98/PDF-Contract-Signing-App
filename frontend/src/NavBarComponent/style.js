import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    navbar : {
        background : 'red'
    },
    navlinks: {
        marginLeft: theme.spacing(10),
        display: "flex",
      },
     logo: {
        flexGrow: "1",
        cursor: "pointer",
      },
      link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(20),
        "&:hover": {
          color: "yellow",
          borderBottom: "1px solid white",
        },
      },
      email : {
          padding : '20px'
      }
}));

