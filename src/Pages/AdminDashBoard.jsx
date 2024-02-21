// AdminDashboard.jsx

import NavBar from '../Components/NavBar/AdminNavBar';
import SideBar from '../Components/SideBar/AdminSideBar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <>
      <NavBar />
      <div className='flex' style={{ backgroundColor: 'lightblue' }}>
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;
