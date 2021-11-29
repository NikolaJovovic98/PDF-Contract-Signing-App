import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { check_cookie_action } from '../actions/users_action';
import { useDispatch } from 'react-redux';


const UnprotectedRoute = ({children}) => {

    const dispatch = useDispatch();

    const cookie_state_data = useSelector( state => state.check_cookie );
    const { cookie_login } = cookie_state_data;

    React.useEffect(()=>{
        dispatch(check_cookie_action());
    },[dispatch]);

    return (
        typeof cookie_login !== 'undefined'
        ?
        (
          !cookie_login
          ?
          children
          :
          <Navigate to='/' />
        )
        :
        null
    )
}

export default UnprotectedRoute;
