import React from 'react'

import StaffNavBar from '../Components/NavBar/StaffAdvNavBar';
import SideBar from '../Components/SideBar/StaffAdvSideBar';
import { Outlet } from 'react-router-dom';
const StaffAdvisorDashBoard = () => {
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

export default StaffAdvisorDashBoard