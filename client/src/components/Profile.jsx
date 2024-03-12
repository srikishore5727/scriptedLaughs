import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNote from '@mui/icons-material/EditNote';
import AppsTwoToneIcon from '@mui/icons-material/AppsTwoTone';
import { Link } from 'react-router-dom';


const Profile = ({ userData }) => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get('https://api-27il.onrender.com/prankscripts/')
            .then(res => {
                const filtered = res.data.filter(item => item.username === userData.name);
                setFilteredData(filtered);
            })
            .catch(err => console.log(err));
    }, [userData]);

    const avatarUrl = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${userData.name}`;  

    const handleDelete = (id) => {
    axios.delete(`https://api-27il.onrender.com/prankscripts/deleteData/${id}`)
      .then(() => {
        setFilteredData(prevData => prevData.filter(item => item._id !== id));
      })
      .catch(err => console.log(err));
    };


    return (
        <div>
            <div className='profileData'>
                <div style={{ width: "fit-content" }}>
                    <img style={{ height: "100px", borderRadius: "8px",boxShadow:"rgba(3, 102, 214, 0.3) 0px 0px 0px 3px" }}
                        src={avatarUrl}
                        alt="avatar" />
                </div>
                <div>
                    <h1 className='userDetails'>{userData.name}</h1>
                    <p className='userDetails'><b>Email Id:</b> {userData.email}</p>
                </div>
            </div>
            <div>
            <p className='postText'><AppsTwoToneIcon/><span style={{margin:"2px"}}>POSTS</span></p>    
            <hr className='postHr' style={{ width: "80%", margin: "auto" }} />
            </div>

            <div className='listData'>
                {filteredData.map(item => (
                    <div key={item._id} className='profileDataContent' style={{width:"auto",margin:"50px"}}>
                    <div className='headInfo'>
                      <h1 className='title'>{item.title}</h1>
                      <h6 className='category'><b>category: </b>{item.category}</h6>
                    </div>
                    <div className='contentBox'>
                      <p>{item.description}</p>
                      <Link to={`/update/${item._id}`} state={item} className='btn btn-primary icon'>
                        <EditNote />
                      </Link>
                      <button className="btn btn-danger" onClick={(e) => {
                        e.preventDefault();
                        handleDelete(item._id);
                      }}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                    
                ))}
            </div>
        </div>
    );
}

export default Profile;
