import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom';

const Navbar = ({name}) => {


  const avatarUrl=`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${name}`; 


  return (
    <nav>
        <div className='container'>
            <div>
                <h1>Scripted Laughs</h1>
            </div>
            <div className='homeProfile'>
            <Link to="/profile">
            <img src={avatarUrl} alt="avatar" />
            </Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;