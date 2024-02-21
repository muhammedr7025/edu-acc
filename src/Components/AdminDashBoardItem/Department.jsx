// Department.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminEditDept from '../PopUpView/AdminPop/AdminDeparmentPop/AdminEditDept';
import AdminCreateDept from '../PopUpView/AdminPop/AdminDeparmentPop/AdminCreateDept';

const Department = () => {
  const [editDeptPopBtn, setEditDeptPopBtn] = useState(false);
  const [addDeptPopBtn, setAddDeptPopBtn] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editedDeptData, setEditedDeptData] = useState(null);

  const getRowColor = (index) => {
    return index % 2 === 0 ? 'bg-text-hover-bg' : '';
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/Department/department/');
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  useEffect(() => {
    fetchDepartmentData();
  }, []);

  const handleEdit = async (editedDeptData) => {
    try {
      await axios.put(`http://127.0.0.1:8000/Department/department/${editedDeptData.id}/`, editedDeptData);
      fetchDepartmentData();
      setEditDeptPopBtn(false); // Close the popup when Save is clicked
    } catch (error) {
      console.error('Error editing department:', error);
    }
  };

  const handleDelete = async (row) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/Department/department/${row.id}/`);
      fetchDepartmentData();
      console.log(`Deleted department with ID ${row.id}`);
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleAddDept = async (newDept) => {
    try {
      await axios.post('http://127.0.0.1:8000/Department/department/', newDept);
      fetchDepartmentData();
      console.log('Added new department:', newDept);
      setAddDeptPopBtn(false); // Close the popup when Add is clicked
    } catch (error) {
      console.error('Error adding new department:', error);
    }
  };

  const handleCancelAddDept = () => {
    setAddDeptPopBtn(false); // Close the popup when Cancel is clicked
  };

  return (
    <div className="p-7 text-2xl text-black bg-blue-100 w-full font-semibold ">
      {/* Add department button */}
      <button
        onClick={() => setAddDeptPopBtn(true)}
        className="bg-text-hover-color W-[60px] h-[40px] rounded-lg mt-1 text-center p-2 text-[20px] text-white font-normal"
      >
        Add
      </button>

      {/* Table data */}
      <table className="pl-[10px] text-left table-auto bg-white border w-full rounded-[25px] shadow-lg">
        <thead className="rounded-lg">
          <tr className="rounded-lg ">
            {/* <th className="px-4 py-2 font-semibold">SI.no</th> */}
            <th className="px-4 py-2 font-semibold">Department</th>
            <th className="px-4 py-2 font-semibold">HOD</th>
            <th className="px-4 py-2 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="font-sans ">
          {tableData.map((row, index) => (
            <tr key={row.id} className={getRowColor(index)}>
              {/* <td className="px-4 py-2 font-light text-[20px]  ">{row.id}</td> */}
              <td className="px-4 py-2 font-light text-[20px]">{row.department}</td>
              <td className="px-4 py-2 font-light text-[20px]">{row.hod}</td>
              <td className="px-4 py-2 flex gap-6 ">
                <button className="mr-2" onClick={() => setEditedDeptData(row) || setEditDeptPopBtn(true)}>
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

      {editDeptPopBtn && (
        <AdminEditDept
          deptData={editedDeptData}
          onEdit={handleEdit}
          onCancel={() => setEditDeptPopBtn(false)}
        />
      )}
      {addDeptPopBtn && (
        <AdminCreateDept onAddDept={handleAddDept} onCancel={handleCancelAddDept} />
      )}
    </div>
  );
};

export default Department;
