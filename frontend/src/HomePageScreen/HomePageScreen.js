import React, {useContext} from 'react';
import NavBar from '../NavBar';
import { GlobalContext } from '../App';
import MainPanel from '../Panel/MainPanel/MainPanel';
import useStyle from './style';

const HomePageScreen = () => {

    const classes = useStyle();

    const { user_info_context, set_user_info_context } = useContext(GlobalContext);

    return (
        <>
        <NavBar user={user_info_context} set_user_context={set_user_info_context}/>
        <div className={classes.home_page_main_panel}>
            <MainPanel/>
        </div>
        </>
    )
}

export default HomePageScreen;
