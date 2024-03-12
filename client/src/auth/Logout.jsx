import ExitToApp from '@mui/icons-material/ExitToApp';
import React from 'react';
import {useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // localStorage.removeItem('token');
        Cookies.remove('token');
        navigate('/login');
    };

    return (
        <div>
            <div onClick={handleLogout}>
                <ExitToApp/>
            </div>
        </div>
    );
};

export default Logout;
