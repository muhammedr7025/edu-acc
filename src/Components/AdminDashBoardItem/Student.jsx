// Student.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminEditStudent from '../PopUpView/AdminPop/AdminStudentPop/AdminEditStudent';
import AdminCreateStudent from '../PopUpView/AdminPop/AdminStudentPop/AdminCreateStudent';

const Student = () => {
  const [editStudentPopBtn, setEditStudentPopBtn] = useState(false);
  const [addStudentPopBtn, setAddStudentPopBtn] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editedStudentData, setEditedStudentData] = useState(null);

  const getRowColor = (index) => {
    return index % 2 === 0 ? 'bg-text-hover-bg' : '';
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/Student/student/');
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleEdit = async (editedStudentData) => {
    try {
      await axios.put(`http://127.0.0.1:8000/Student/student/${editedStudentData.id}/`, editedStudentData);
      fetchStudentData();
      setEditStudentPopBtn(false); // Close the popup when Save is clicked
    } catch (error) {
      console.error('Error editing student:', error);
    }
  };

  const handleDelete = async (row) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/Student/student/${row.id}/`);
      fetchStudentData();
      console.log(`Deleted student with ID ${row.id}`);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleAddStudent = async (newStudent) => {
    try {
      await axios.post('http://127.0.0.1:8000/Student/student/', newStudent);
      fetchStudentData();
      console.log('Added new student:', newStudent);
      setAddStudentPopBtn(false); // Close the popup when Add is clicked
    } catch (error) {
      console.error('Error adding new student:', error);
    }
  };

  const handleCancelAddStudent = () => {
    setAddStudentPopBtn(false); // Close the popup when Cancel is clicked
  };

  return (
    <div className="p-7 text-2xl text-black bg-blue-100 w-full font-semibold ">
      {/* Add student button */}
      <button
        onClick={() => setAddStudentPopBtn(true)}
        className="bg-text-hover-color W-[60px] h-[40px] rounded-lg mt-1 text-center p-2 text-[20px] text-white font-normal"
      >
        Add
      </button>

      {/* Table data */}
      <table className="pl-[10px] text-left table-auto bg-white border w-full rounded-[25px] shadow-lg">
        <thead className="rounded-lg">
          <tr className="rounded-lg ">
            {/* <th className="px-4 py-2 font-semibold">SI.no</th> */}
            <th className="px-4 py-2 font-semibold">Name</th>
            <th className="px-4 py-2 font-semibold">Phone No:</th>
            <th className="px-4 py-2 font-semibold">Department</th>
            <th className="px-4 py-2 font-semibold">Batch</th>
            <th className="px-4 py-2 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="font-sans ">
          {tableData.map((row, index) => (
            <tr key={row.id} className={getRowColor(index)}>
              {/* <td className="px-4 py-2 font-light text-[20px]  ">{row.id}</td> */}
              <td className="px-4 py-2 font-light text-[20px]">{row.name}</td>
              <td className="px-4 py-2 font-light text-[20px]">{row.phone}</td>
              <td className="px-4 py-2 font-light text-[20px]">{row.department}</td>
              <td className="px-4 py-2 font-light text-[20px]">{row.batch}</td>
              <td className="px-4 py-2 flex gap-6 ">
                <button
                  className="mr-2"
                  onClick={() => setEditedStudentData(row) || setEditStudentPopBtn(true)}
                >
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

      {editStudentPopBtn && (
        <AdminEditStudent
          studentData={editedStudentData}
          onEdit={handleEdit}
          onCancel={() => setEditStudentPopBtn(false)}
        />
      )}
      {addStudentPopBtn && (
        <AdminCreateStudent onAddStudent={handleAddStudent} onCancel={handleCancelAddStudent} />
      )}
    </div>
  );
};

export default Student;
