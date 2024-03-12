import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Navbar from './Navbar/Navbar';
import Logout from '../auth/Logout';
import Cookies from 'js-cookie';

const Home = ({ username }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filteredUser, setFilteredUser] = useState('all'); // State to store selected username for filtering
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/');
    }
    axios.get('https://api-27il.onrender.com/prankscripts/')
      .then(res => {
        setData(res.data);
        setLoader(false);
      })
      .catch(err => console.log(err));
  }, []);

  // Extracting unique usernames from the data
  const users = [...new Set(data.map(item => item.username))];

  // Filter data based on selected username
  const filteredData = filteredUser === 'all' ? data : data.filter(item => item.username === filteredUser);

  return (
    <div>
      <div>
        <Navbar name={username} />
      </div>
      <div className='bodyContainer'>
        <div className='contentContainer'>
          <div className='dropDownFilter'>
          <select value={filteredUser} onChange={(e) => setFilteredUser(e.target.value)}>
            <option value="all">All Users</option>
            {users.map((user, index) => (
              <option key={index} value={user}>{user}</option>
            ))}
          </select>
          </div>
          {loader ?
            (
              <div>
                <div className='loaderOpt'>
                  <img className='loader' src="https://media.tenor.com/JwPW0tw69vAAAAAi/cargando-loading.gif" alt="loader...." />
                </div>
              </div>
            )
            :
            (
              filteredData.map((datas) => {
                return (
                  <div key={datas._id} className='totalContent'>
                    <div className='headInfo'>
                      <h1 className='title'>{datas.title}</h1>
                      <h6 className='category'><b>category: </b>{datas.category}</h6>
                    </div>
                    <div className='contentBox'>
                      <p>{datas.description}</p>
                    </div>
                  </div>
                );
              })
            )}
        </div>
      </div>
      <div style={{ textAlign: "center", position: "fixed", bottom: "0%", width: "100%" }}>
        <div style={{ width: 'fit-content' }}>
          <Link to="/create">
            <Tooltip title="Add Post" placement='left'>
              <Fab color="primary" aria-label="add" sx={{ width: '80px', height: '80px', display: 'block', margin: '15px' }}>
                <AddIcon sx={{ fontSize: '3rem' }} />
              </Fab>
            </Tooltip>
          </Link>

          <div style={{ cursor: "pointer" }}>
            <Tooltip title="Logout" placement='left'>
              <Fab color='primary' aria-label="add" sx={{ width: '80px', height: '80px', display: 'block', margin: '15px' }}>
                <Logout sx={{ fontSize: '3rem' }} />
              </Fab>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
