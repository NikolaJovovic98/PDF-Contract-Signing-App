import * as api from '../api/api_manager';

export const login_action = (loginData) => async (dispatch) =>{
    try {
        dispatch({
            type : 'LOGIN_REQUEST'
        });

        const { data } = await api.login_user(loginData);

        dispatch({
            type : 'LOGIN_SUCCESS',
            payload : data
        });
    } catch (error) {
        console.log("Error in login user: ",error.message);
        dispatch({
            type : 'LOGIN_FAIL',
            payload : error.response.data.msg
        })
    }
};


export const check_cookie_action = () => async (dispatch) =>{
    try {
        dispatch({type:'GET_COOKIE_REQUEST'});

        const { data } = await api.check_cookie();

        dispatch({
            type : 'GET_COOKIE_LOGGED_IN',
            payload : data
        });
    } catch (error) {
        dispatch({
            type : 'GET_COOKIE_LOGGED_OUT',
            payload : error.response.data
        });
    }
};


export const logout_action = () => async (dispatch) => {
    try {

        const { data } = await api.logout_user();

        dispatch({
            type : 'GET_COOKIE_LOGGED_OUT',
            payload : data
        });

    } catch (error) {
        console.log('Error in logging out: ',error.message);
        dispatch({
            type : 'GET_COOKIE_LOGGED_OUT',
            payload : error.response.data
        });
    }
}

export const get_users_action = () => async (dispatch) => {
    try{

        dispatch({
            type : 'REQUEST_GET_USERS'
        });

        const { data } = await api.get_all_users();

        dispatch({
            type : 'SUCCESS_GET_USERS',
            payload : data
        });

    }catch(error){
        console.log('Error in getting all users: ',error.message);
        dispatch({
            type : 'ERROR_GET_USERS',
            payload : error.response.data.msg
        });
    }
};


export const add_new_user_action = (userData) => async (dispatch) => {
    try {

        const { data } = await api.add_new_user(userData);

        dispatch({
            type : 'SUCCESS_GET_USERS',
            payload : data
        });

    } catch (error) {
        console.log('Error in adding new user: ',error.message);
        dispatch({
            type : 'ERROR_ADD_USER',
            payload : error.response.data
        });
    }
};

export const remove_user_action = (userId) => async (dispatch) => {
    try {

        const { data } = await api.remove_user(userId);

        dispatch({
            type : 'SUCCESS_GET_USERS',
            payload : data
        });

    } catch (error) {
        console.log('Error in removing user: ',error.message);
        dispatch({
            type : 'ERROR_GET_USERS',
            payload : error.response.data.msg
        });
    }
};