
import NavBar from '../Components/NavBar/StudentNavBar';
import SideBar from '../Components/SideBar/StudentSideBar'
 import { Outlet } from 'react-router-dom';
import Subject from '../Components/StudentDashBoardItem/Subject';
const StudentDashBoard = () => {
  return (
    <>
      <NavBar />
      <div className='flex'>
        <SideBar />
        <Outlet />    
      </div>
    </>
  );
}

export default StudentDashBoard;  