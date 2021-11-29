import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useStyle from './style';
import { GlobalContext } from '../../App';


export default function Selection({handleSwitch}) {

  const classes = useStyle();

  const { user_info_context } = useContext(GlobalContext);
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box  className={classes.select}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Lista Ugovora"  onClick={handleSwitch} />
        <Tab disabled={!user_info_context.is_admin} label="Korisnici" onClick={handleSwitch} />
      </Tabs>
    </Box>
  );
}