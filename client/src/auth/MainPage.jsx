import React from 'react';
import { Link } from 'react-router-dom';
import './mainPage.css'

const MainPage = () => {
    return (
        <div className="main-container">
            <h1 className='appName'>Scripted Laughs</h1>
            <div className="button-container">
                <Link to="/register" className="button">Register</Link>
                <Link to="/login" className="button">Login</Link>
            </div>
        </div>
    );
};

export default MainPage;
