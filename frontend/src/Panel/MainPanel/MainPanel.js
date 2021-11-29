import React, { useState } from 'react';
import useStyle from './style';
import Selection from '../Selection/Selection';
import ListPanel from '../ListPanel/ListPanel';
import UsersPanel from '../UsersPanel/UsersPanel';
import { Divider } from '@material-ui/core';

const MainPanel = () => {

    const classes = useStyle();

    const [showList, setShowList] = useState(true);
    const [showUsers, setShowUsers] = useState(false);

    const handleSwitch = (e) => {
        switch (e.target.innerText) {
            case 'LISTA UGOVORA':
                setShowList(true);
                setShowUsers(false);
                break;
            case 'KORISNICI':
                setShowList(false);
                setShowUsers(true);
                break;
            default :
                setShowList(true);
                setShowUsers(false);
        }
    };

    const DisplayListPanel = () => {
        if (showList) {
            return <ListPanel />
        } else return null;
    };

    const DisplayUsersPanel = () => {
        if (showUsers) {
            return <UsersPanel />
        } else return null;
    };

    return (
        <div className={classes.main}>

            <div className={classes.main_select} >
                <Selection handleSwitch={handleSwitch} />
            </div>

            <Divider></Divider>

            <div className={classes.main_selected_option}>
                <DisplayListPanel />
                <DisplayUsersPanel />
            </div>

        </div>
    )
}

export default MainPanel;
