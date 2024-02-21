import React from 'react'
import { PiStudentBold } from 'react-icons/pi';
const StaffNavBar = () => {
    return (
        <div className=" w-full   h-[90px]  ">
            <div className="flex justify-between">
            <div className=" my-[30px] mx-[30px] flex gap-5 items-center ">
              <PiStudentBold className="bg-text-hover-bg text-red text-5xl"></PiStudentBold>
              <div className={`text-3xl  ${!open && 'hidden'} duration-300 text-text-hover-color text-5xl font-semibold`}> Staff </div>
            </div>
               <div className='hidden md:flex item-center my-8 mx-2  text-text-hover-color font-bold text-2xl '>
                Hello , Staff Advisor
               </div>
               <div className='flex items-center mb-4 gap-5 pr-10'>
               <i className="fa-solid fa-bell text-4xl text-bell-color"></i>
               <i className="fa-solid fa-circle-user  text-5xl text-text-hover-bg"></i>
               </div>
            </div>
        </div>
      )
}

export default StaffNavBar