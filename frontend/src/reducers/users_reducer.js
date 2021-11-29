export const login_reducer = ( user_login = {}, action ) =>{
    switch(action.type){
        case 'LOGIN_REQUEST' :
            return {
                loading : true
            }
        case 'LOGIN_SUCCESS' :
            if(action.payload?.email) localStorage.setItem('user_info',JSON.stringify(action.payload));
            return {
                loading : false,
                user_login : action.payload
            }
        case 'LOGIN_FAIL' :
            return {
                login_error : action.payload
            }
        case 'EMPTY_LOGIN_DATA' :
            user_login = {};
            return user_login;
        default :
            return user_login;
    };
};

export const check_cookie_reducer = ( cookie_login = {} , action ) =>{
    switch(action.type) {
        case 'GET_COOKIE_REQUEST' :
            return {
                loading : true
            }
        case 'GET_COOKIE_LOGGED_IN' :
            return {
                loading : false,
                cookie_login : action.payload
            }
        case 'GET_COOKIE_LOGGED_OUT' :
            localStorage.removeItem('user_info');
            return {
                loading : false,
                cookie_login : action.payload
            }
        default : 
            return cookie_login;
    };
};

export const get_users_reducer = ( all_users = [], action ) => {
    switch(action.type) {
        case 'REQUEST_GET_USERS' :
            return {
                loading : true
            }
        case 'SUCCESS_GET_USERS' :
            return {
                loading : false,
                all_users : action.payload
            }
        case 'ERROR_GET_USERS' :
            return {
                loading : false,
                all_users_error : action.payload
            }
        case 'ERROR_ADD_USER' : 
            return {
                all_users : [...action.payload.data],
                all_users_error : action.payload.error
            }
        default :
            return all_users;
    }
};