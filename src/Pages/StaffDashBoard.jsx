import React from 'react'

import StaffNavBar from '../Components/NavBar/StaffNavBar';
import SideBar from '../Components/SideBar/StaffSideBar';
import { Outlet } from 'react-router-dom';
const StaffDashBoard = () => {
    return (
        <>
          <StaffNavBar />
          <div className='flex'>
            <SideBar />
            <Outlet />    
          </div>
        </>
      );
}

export default StaffDashBoard