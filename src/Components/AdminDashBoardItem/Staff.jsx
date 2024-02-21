// Staff.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import AdminEditStaff from '../../Components/PopUpView/AdminPop/AdminStaffPop/AdminEdittStaff';
import AdminCreateStaff from '../../Components/PopUpView/AdminPop/AdminStaffPop/AdminCreateStaff';

const Staff = () => {
  const [editStaffPopBtn, setEditStaffPopBtn] = useState(false);
  const [addStaffPopBtn, setAddStaffPopBtn] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editedStaffData, setEditedStaffData] = useState(null);

  const getRowColor = (index) => {
    return index % 2 === 0 ? 'bg-text-hover-bg' : '';
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/Staff/staff/');
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (editedStaffData) => {
    try {
      await axios.put(`http://127.0.0.1:8000/Staff/staff/${editedStaffData.id}/`, editedStaffData);
      fetchData();
      console.log('Edited staff:', editedStaffData);
      setEditStaffPopBtn(false); // Close the popup after editing
    } catch (error) {
      console.error('Error editing staff:', error);
    }
  };

  const handleDelete = async (row) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/Staff/staff/${row.id}/`);
      fetchData();
      console.log(`Deleted row with ID ${row.id}`);
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const handleAddStaff = async (newStaff) => {
    try {
      await axios.post('http://127.0.0.1:8000/Staff/staff/', newStaff);
      fetchData();
      console.log('Added new staff:', newStaff);
      setAddStaffPopBtn(false); // Close the popup when Add is clicked
    } catch (error) {
      console.error('Error adding new staff:', error);
    }
  };

  const handleCancelAddStaff = () => {
    setAddStaffPopBtn(false); // Close the popup when Cancel is clicked
  };

  return (
    <div className="p-7 text-2xl text-black bg-blue-100 w-full font-semibold ">
      <button
        onClick={() => setAddStaffPopBtn(true)}
        className="bg-text-hover-color W-[60px] h-[40px] rounded-lg mt-1 text-center p-2 text-[20px] text-white font-normal"
      >
        Add
      </button>
      <table className="pl-[10px] text-left table-auto bg-white border w-full rounded-[25px] shadow-lg">
        <thead className="rounded-lg">
          <tr className="rounded-lg ">
            {/* <th className="px-4 py-2 font-semibold">SI.no</th> */}
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
              {/* <td className="px-4 py-2 font-light text-[20px]  ">{row.id}</td> */}
              <td className="px-4 py-2 font-light text-[20px]">{row.name}</td>
              <td className="px-4 py-2 font-light text-[20px]">{row.department}</td>
              <td className="px-4 py-2 font-light text-[20px]">{row.role}</td>
              <td className="px-4 py-2 font-light text-[20px]">{row.email}</td>
              <td className="px-4 py-2 flex gap-6 ">
                <button className="mr-2" onClick={() => { setEditedStaffData(row); setEditStaffPopBtn(true); }}>
                  <i className="fa-solid fa-pencil text-blue-500"></i>
                </button>
                <button onClick={() => handleDelete(row)}>
                  <i className="fa-solid fa-trash text-red-500"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editStaffPopBtn && (
        <AdminEditStaff
          staffData={editedStaffData}
          onEdit={handleEdit}
          onCancel={() => setEditStaffPopBtn(false)}
        />
      )}
      {addStaffPopBtn && <AdminCreateStaff onAddStaff={handleAddStaff} onCancel={handleCancelAddStaff} />}
    </div>
  );
};

export default Staff;
