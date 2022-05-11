import React from 'react';
import './navbar.css';
import image1 from './logo4.png';



function Header() {

  return (
    <div className='Navbar'>
        <div className='leftSide'>
            <img src={image1} alt="" />
        </div>
        <div className='rightSide'>
            <div className='links'>
                <a href='/home'>Home</a>
                <a href='/aboutus'>About Us</a>
                <a href='/schedules'>Schedules</a>
                <a href='/blogs'>Blogs</a>
                <a href='/reviews'>Reviews</a>
                <a href='/contactus'>Contact Us</a>  
            </div>
            <div className='search'>
              <input type="text" placeholder='Search...'/>
                    
            </div>
        </div>
    </div>
  )
}

export default Header;