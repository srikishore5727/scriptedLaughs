import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().required('Name is required').min(3, 'Name should be at least 3 characters').max(30, 'Name should be at most 30 characters'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(6, 'Password should be at least 6 characters').required('Password is required')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await schema.validate({ name, email, password }, { abortEarly: false });
            const response = await axios.post('https://api-27il.onrender.com/prankscripts/registerPage', { name, email, password });
            if (response.status === 200) {
                toast.success('Registration successful!', { autoClose: 2000 });
                navigate('/login');
            }
        } catch (error) {
            error.inner.forEach(err => {
                toast.error(err.message, { autoClose: 2000 });
            });
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="register-container">
            <ToastContainer/>
            <h2 className="register-heading">Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input className="register-input" type="text" placeholder="Name" value={name} autoComplete='username' onChange={(e) => setName(e.target.value)} />
                <input className="register-input" type="email" placeholder="Email" value={email} autoComplete='email' onChange={(e) => setEmail(e.target.value)} />
                <input className="register-input" type="password" placeholder="Password" value={password} autoComplete='current-password' onChange={(e) => setPassword(e.target.value)} />
                <button className="register-button" type="submit">Register</button>
            </form>
            <p className="register-link">Already have an Account <Link to='/login'>Click here</Link></p>
        </div>
    );
};

export default Register;
