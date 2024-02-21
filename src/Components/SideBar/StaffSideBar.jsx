  import { useState, useEffect } from 'react';
  import { AiOutlineArrowLeft } from 'react-icons/ai';
  import { TiGroupOutline } from 'react-icons/ti';
  import { FcDepartment } from 'react-icons/fc';
  import { IoIosLogOut } from 'react-icons/io';
  import { Link, useNavigate } from 'react-router-dom';

  const SideBar = () => {
    const [open, setOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState('staffadvisor'); // Default selected item
    const navigate = useNavigate();

    const Menus = [
      { title: 'Mission Vision', icon: <TiGroupOutline key='Staff' /> },
      { title: 'syllabus', icon: <FcDepartment key='syllabus' /> },
      { title: 'Timetable', icon: <FcDepartment key='Timetable' /> }, 
      { title: 'studentlist', icon: <FcDepartment key='student list' /> }, 
      { title: 'CO mapping', icon: <FcDepartment key='co,po,bl' /> }, 
      { title: 'Acedemic calender', icon: <FcDepartment key='acedemic calender' /> }, 
      { title: 'course plan', icon: <FcDepartment key='course plan' /> }, 
      { title: 'TAE parameter', icon: <FcDepartment key='TAE parameter' /> }, 
      { title: 'Course Coverage', icon: <FcDepartment key='Course Coverge' /> }, 
      { title: 'Attendence Register', icon: <FcDepartment key='Attendence Register' /> }, 
      { title: 'Prevous Univercity Qp ', icon: <FcDepartment key='PUQP' /> },  
      { title: 'Assignment 1 Qp ', icon: <FcDepartment key='Assign1' /> },  
      { title: 'Series 1 Qp', icon: <FcDepartment key='int test qp' /> }, 
      { title: 'Assignment 2 Qp ', icon: <FcDepartment key='Assign1' /> },  
      { title: 'Series 2 Qp', icon: <FcDepartment key='int test qp' /> },
      { title: 'nbaReport', icon: <FcDepartment key='Department' /> },
    
      { title: 'logout', icon: <IoIosLogOut key='logout' /> },
    ];

    const toggleOpen = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
      if (!open) {
        // Delayed execution to ensure state change takes effect
        const timeoutId = setTimeout(() => {
          toggleOpen();
        }, 0);

        return () => clearTimeout(timeoutId);
      }
    }, [open]);

    let containerClass =
      'bg-light-blue p-5 pt-8 fixed top-0 botton-0 left-0 overflow-y-auto';
    if (open) {
      containerClass += ' w-[17rem] max-h-screen';
    } else {
      // containerClass += ' w-20'; 
      containerClass += ' w-[17rem] max-h-screen';
    }
    containerClass += ' relative duration-300';

    const handleMenuItemClick = (title) => {
      setSelectedItem(title); // Update selected item
      navigate(`/staffdashboard/${title}`);
      toggleOpen(); // Close the sidebar after navigation
    };

    return (
      <div className='md:flex'>
        <div className={containerClass}>
          <AiOutlineArrowLeft
            onClick={toggleOpen}
            className={`sm :  bg-white text-dark-purple text-3xl rounded-full absolute md : hidden -right-3 top-9 border border-dark-purple cursor-pointer ${!open && 'rotate-180'}`}
          ></AiOutlineArrowLeft>
          <div></div>
          <ul className='pb-3 pt-3 '>
            {Menus.map((menuitem) => (
              <li
                key={menuitem.title}
                className={`text-black  flex pl-[30px] items-center text-sm gap-x-4 cursor-pointer p-2 hover:bg-text-hover-bg mt-2 rounded-lg hover:text-text-hover-color ${selectedItem === menuitem.title && 'bg-gray-200'}`}
                onClick={() => handleMenuItemClick(menuitem.title)}
              >
                <Link
                  to={`/${menuitem.title.toLowerCase()}`}
                  className='text-l block float-left text-4xl'
                >
                  {menuitem.icon}
                </Link>
                <span className={`${!open && 'hidden '}`}>
                  {menuitem.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  export default SideBar;
