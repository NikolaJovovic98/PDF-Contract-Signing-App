import React, {createContext, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import LoginScreen from './LoginScreen/LoginScreen';
import HomePageScreen from './HomePageScreen/HomePageScreen';
import UnprotectedRoute from './UnprotectedRoute/UnprotectedRoute';

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
const THEME = createTheme({
    typography: {
        "fontFamily": "'Lora', serif",
    }
});

export const GlobalContext = createContext();

const App = () => {

    const [ user_info_context, set_user_info_context ] = useState({});

    const cookie_state_data = useSelector(state => state.check_cookie);

    React.useEffect(()=>{
        if(typeof cookie_state_data?.cookie_login !== 'undefined'){
            if(cookie_state_data?.cookie_login){
                set_user_info_context({...JSON.parse(localStorage.getItem('user_info'))});
            }
        }
    },[cookie_state_data?.cookie_login]);

    return (
        <div className="App">
        <MuiThemeProvider theme={THEME}>

            <GlobalContext.Provider value={{
                user_info_context,
                set_user_info_context
            }}>

            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <HomePageScreen />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/login" 
                        element={
                            <UnprotectedRoute>
                                <LoginScreen/>
                            </UnprotectedRoute>
                        } />
                </Routes>
            </BrowserRouter>
            </GlobalContext.Provider>
        </MuiThemeProvider>
        </div>
    )
}

export default App;
