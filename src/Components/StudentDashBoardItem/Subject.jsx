import { useState } from 'react';
// import { BsSearch } from 'react-icons/bs';
import AdminEditStaff from '../../Components/PopUpView/AdminPop/AdminStaffPop/AdminEdittStaff'
import AdminCreateStaff from '../../Components/PopUpView/AdminPop/AdminStaffPop/AdminCreateStaff'
const Subject = () => { 
  const [EditStaffPopBtn ,setEditStaffPopBtn] = useState(false);
  const [AddStaffPopBtn ,setAddStaffPopBtn] = useState(false);
  
  
//   const tableData = [
//     { id: 1, name: 'A', department: 'CSE', role: 'HOD', email: 'gmail' },
//     { id: 2, name: 'S', department: 'CSE', role: 'Asst. Professor', email: 'gmail' },
//     { id: 3, name: 'G', department: 'EC', role: 'HOD', email: 'gmail' },
//     { id: 4, name: 'P', department: 'EC', role: 'Asst. Professor', email: 'gmail' },
//     { id: 5, name: 'B', department: 'ECE', role: 'HOD', email: 'gmail' },
//     { id: 6, name: 'D', department: 'ECE', role: 'Asst. Professor', email: 'gmail' },
//     { id: 5, name: 'T', department: 'CE', role: 'HOD', email: 'gmail' },
//     { id: 6, name: 'L', department: 'ECE', role: 'Asst. Professor', email: 'gmail' },
  
 // ];
//   const getRowColor = (index) => {
//     return index % 2 === 0 ? 'bg-text-hover-bg' : '';
//   }; 
//   const handleEdit = (row) => {
//     console.log(`Editing row with ID ${row.id}`);
//     // Set EditStaffPopBtn to true to display the edit popup
//     setEditStaffPopBtn(true);
//   };

  // Function to handle delete action
//   const handleDelete = (row) => {
//     // Add your delete logic here
//     console.log(`Deleting row with ID ${row.id}`);
//   };
  return ( 
    
    <div className="p-7 text-2xl text-black bg-blue-100 w-full    font-semibold ">
      <div className='fixed top-10 left-[65rem] z-[2]'>
      { EditStaffPopBtn &&           <button onClick={() => setEditStaffPopBtn(false)} className='cursor-pointer'>X</button>
}
      </div> 
      <div className='fixed top-10 left-[65rem] z-[2]'>
      { AddStaffPopBtn &&   <button onClick={() => setAddStaffPopBtn(false)} className='cursor-pointer'>X</button>
}
      </div>
      <div className=" md:bg-dashboard-light-100 h-screen w-full">
        <div className="ml-[6%] gap-10 grid grid-cols-1 md:grid-cols-2 w-fit">
           
          <div className="md:w-[25rem] h-[5rem] bg-white rounded-md shadow-lg ">
            <div className="flex justify-between px-4 py-2">
              <div className="flex flex-col my-3.5">
                <div className="text-[grey] text-xl"></div>
                <div className="text-text-hover-color">Subject</div>
              </div>
              <div className="flex  py-[10px]">
                <div className="w-[2.5rem] md:w-[2.5rem] h-[2.5rem] bg-light-blue rounded-[25%] text-center py-[5%]">
                  -{`>`}
                </div>
              </div>
            </div>
          </div>

          
         <div className=" md:w-[25rem] h-[5rem] bg-white rounded-md shadow-lg ">
            <div className="flex justify-between px-4 py-2">
              <div className="flex flex-col my-3.5">
                <div className="text-[grey] text-xl"></div>
                <div className="text-text-hover-color">
                  Attendence
                </div>
              </div>
              <div className="flex  py-[10px]">
                <div className="w-[2.5rem] md:w-[2.5rem] h-[2.5rem] bg-light-blue rounded-[25%] text-center py-[5%]">
                  -{`>`}
                </div>
              </div>
            </div>
          </div>

       
         <div className=" md:w-[25rem] h-[5rem] bg-white rounded-md shadow-lg ">
            <div className="flex justify-between px-4 py-2">
              <div className="flex flex-col my-3.5">
                <div className="text-[grey] text-xl"></div>
                <div className="text-text-hover-color">Series 1 mark</div>
              </div>
              <div className="flex  py-[10px]">
                <div className="w-[2.5rem] md:w-[2.5rem] h-[2.5rem] bg-light-blue rounded-[25%] text-center py-[5%]">
                  -{`>`}
                </div>
              </div>
            </div>
          </div> 

          {/* Fourth Set of Elements */}
         <div className=" md:w-[25rem] h-[5rem] bg-white rounded-md shadow-lg   ">
            <div className="flex justify-between px-4 py-2">
              <div className="flex flex-col my-3.5">
                <div className="text-[grey] text-xl"></div>
                <div className="text-text-hover-color">
                Series 2 mark
                </div>
              </div>
              <div className="flex py-[10px]">
                <div className="w-[2.5rem] md:w-[2.5rem] h-[2.5rem] bg-light-blue rounded-[25%] text-center py-[5%]">
                  -{`>`}
                </div>
              </div>
            </div>
          </div>  
          <div className=" md:w-[25rem] h-[5rem] bg-white rounded-md shadow-lg   ">
            <div className="flex justify-between px-4 py-2">
              <div className="flex flex-col my-3.5">
                <div className="text-[grey] text-xl"></div>
                <div className="text-text-hover-color">
                Assignment 1 mark 
                </div>
              </div>
              <div className="flex py-[10px]">
                <div className="w-[2.5rem] md:w-[2.5rem] h-[2.5rem] bg-light-blue rounded-[25%] text-center py-[5%]">
                  -{`>`}
                </div>
              </div>
            </div>
          </div>  
          <div className=" md:w-[25rem] h-[5rem] bg-white rounded-md shadow-lg   ">
            <div className="flex justify-between px-4 py-2">
              <div className="flex flex-col my-3.5">
                <div className="text-[grey] text-xl"></div>
                <div className="text-text-hover-color">
                Assignment 2 mark
                </div>
              </div>
              <div className="flex py-[10px]">
                <div className="w-[2.5rem] md:w-[2.5rem] h-[2.5rem] bg-light-blue rounded-[25%] text-center py-[5%]">
                  -{`>`}
                </div>
              </div>
            </div>
          </div>  
        </div> 
        {/* <div className=" flex bg-white w-full h-[60px] mb-2 rounded-lg shadow-lg items-center justify-between">
            <div className='flex w-[12.5rem] pl-2 gap-3 '>
            <div className=" border border-light-grey flex items-center rounded-md bg-light-white mt-1 px-2.5 py-2">
          <BsSearch className=" text-lg block float-left cursor-pointer mr-2.5"></BsSearch>
          <input
            type="search"
            placeholder="Search"
            className={`text-base bg-transparent w-[12rem] text-grey focus:outline-none ${!open && 'hidden'}`}
          />
        </div>
        <div className='bg-text-hover-color W-[60px ]h-[40px] rounded-lg mt-1 text-center p-2 text-[20px] text-white font-normal'> 
            Search
        </div>
        <button onClick={() => setAddStaffPopBtn(true)} className='bg-text-hover-color W-[60px ]h-[40px] rounded-lg mt-1 text-center p-2 text-[20px] text-white font-normal'> 
            Add
        </button>
            </div> 
            
        </div> */}
      
          {/* <table className="pl-[10px]  text-left table-auto bg-white border w-full rounded-[25px] shadow-lg">
      <thead className="rounded-lg">
        <tr className=" rounded-lg ">
          <th className="px-4 py-2 font-semibold ">SI.no</th>
          <th className="px-4 py-2 font-semibold">Staff Name</th>
          <th className="px-4 py-2 font-semibold">Department</th>
          <th className="px-4 py-2 font-semibold">Role</th>
          <th className="px-4 py-2 font-semibold">Email</th>
          <th className="px-4 py-2 font-semibold">Action</th>
        </tr>
      </thead>
      <tbody className="font-sans ">
        {tableData.map((row, index) => (
          <tr key={row.id} className={getRowColor(index)}>
            <td className="px-4 py-2 font-light text-[20px]  ">{row.id}</td>
            <td className="px-4 py-2 font-light text-[20px]">{row.name}</td>
            <td className="px-4 py-2 font-light text-[20px]">{row.department}</td>
            <td className="px-4 py-2 font-light text-[20px]" >{row.role}</td>
            <td className="px-4 py-2 font-light text-[20px]">{row.email}</td>
            <td className="px-4 py-2 flex gap-6 ">
              <button className="mr-2" onClick={() => {handleEdit(row)}}>
                <i className="fa-solid fa-pencil text-blue-500"></i> 
              </button>
              <button onClick={() => handleDelete(row)}>
                <i className="fa-solid fa-trash text-red-500"></i> 
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table> */}

    {EditStaffPopBtn && <AdminEditStaff></AdminEditStaff>} 
    {AddStaffPopBtn && <AdminCreateStaff></AdminCreateStaff>} 

        
      </div>
    </div>
  );
  };
  
  export default Subject;
  
