import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../auth/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://api-27il.onrender.com/prankscripts/loginInfo', { email, password });
        if (response.status === 200) {
            const token = response.data.token;
            Cookies.set('token', token, { expires: 7 });
            toast.success('Login successful!', { autoClose: 2000 });
            navigate('/home');
            window.location.reload();
        } else {
            toast.error('Email or password is incorrect!', { autoClose: 2000 });
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            toast.error('Email not found!', { autoClose: 2000 });
        } else {
            toast.error('Login failed!', { autoClose: 2000 });
        }
        console.error('Login failed:', error);
    }
};


    return (
        <div className="login-container">
            <h2 className='login-heading'>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input className="login-input" type="email" placeholder="Email" value={email} autoComplete='email' onChange={(e) => setEmail(e.target.value)} />
                <input className="login-input" type="password" placeholder="Password" value={password} autoComplete='current-password' onChange={(e) => setPassword(e.target.value)} />
                <button className="login-button" type="submit">Login</button>
            </form>
            <p className='login-link'>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
            <ToastContainer/>
        </div>
    );
};

export default Login;
