import { combineReducers } from "redux";

import { login_reducer, check_cookie_reducer, get_users_reducer } from '../reducers/users_reducer';

export default combineReducers({
    login : login_reducer,
    check_cookie : check_cookie_reducer,
    get_users : get_users_reducer
});