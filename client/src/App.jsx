import React, { useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Logout from './auth/Logout';
import Home from './components/Home';
import MainPage from './auth/MainPage';
import Register from './auth/Register';
import UpdateData from './components/UpdateData';
import PostFormData from './components/PostFormData';
import Login from './auth/Login';
import Profile from './components/Profile';
import axios from 'axios';
import Cookies from 'js-cookie';

const App = () => {
    const [userData ,setUserData ] =useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        const token = Cookies.get('token') || '';
        axios.post('http://localhost:8000/prankscripts/getIndividualData', {token})
          .then(res => {
            setUserData(res.data)
          })
          .catch(err => {
            navigate('/')
            console.log(err)
          });
    },[]);

    // useEffect(() => {
    //   console.log(userData.email)
    //   console.log(userData.name)
    // },[userData]);

    return (
            <Routes>
                <Route exact path="/" element={<MainPage/>} />
                <Route exact path="/profile" element={<Profile  userData={userData} username={userData.name} />}/>
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/logout" element={<Logout/>} />
                <Route exact path="/home" element={<Home username={userData.name}/>} />
                <Route exact path="/create" element={<PostFormData email={userData.email} username={userData.name} />} />
                <Route exact path="/update/:id" element={<UpdateData/>} />
            </Routes>
    );
};

export default App;
