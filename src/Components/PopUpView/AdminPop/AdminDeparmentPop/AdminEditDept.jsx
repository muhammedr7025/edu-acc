/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const AdminEditDept = ({ deptData, onEdit, onCancel }) => {
  const [editedDeptData, setEditedDeptData] = useState({
    id: deptData.id,  
    department: deptData.department,
    hod: deptData.hod,
  });

  useEffect(() => {
    setEditedDeptData({
      id: deptData.id,
      department: deptData.department,
      hod: deptData.hod,
    });
  }, [deptData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDeptData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    onEdit(editedDeptData);
    onCancel(); // Close the popup when Save is clicked
  };

  const handleCancel = () => {
    onCancel(); // Close the popup when Cancel is clicked
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-gray-800 opacity-75" onClick={handleCancel}></div>
      <div className="z-20 bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Department</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-medium text-gray-600">
              Department:
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={editedDeptData.department}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hod" className="block text-sm font-medium text-gray-600">
              HOD:
            </label>
            <input
              type="text"
              id="hod"
              name="hod"
              value={editedDeptData.hod}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="ml-2 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditDept;
