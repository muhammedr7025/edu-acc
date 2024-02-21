import React, { useState, useEffect } from "react";
import supabase from "../../createClent";
import * as XLSX from "xlsx";
const Departmentlist = () => {
  const [fetchError, setFetchError] = useState(null);
  const [deptList, setDeptList] = useState([]); // Initialize as empty array
  const [addEditDept, setAddEditDept] = useState(null); // State to manage add/edit popup
  const [selectedDept, setSelectedDept] = useState({ name: "", hod: "" }); // State to manage selected department for editing
  const [data, setData] = useState([]);
  const [rerenderFlag, setRerenderFlag] = useState(false); // State variable to trigger re-render

  useEffect(() => {
    const fetchDeptList = async () => {
      try {
        const { data, error } = await supabase.from("department").select();
        if (error) {
          throw error;
        }
        setDeptList(data || []); // Set data to empty array if null
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching department list:", error.message);
        setFetchError("Could not fetch data");
        setDeptList([]); // Set deptList to empty array in case of error
      }
    };
    fetchDeptList();
  }, [rerenderFlag]); // Include rerenderFlag in the dependency array

  const handleEdit = (row) => {
    setSelectedDept(row);
    setAddEditDept("edit");
  };

  const handleDelete = async (row) => {
    try {
      await supabase.from("department").delete().eq("id", row.id);
      setDeptList(deptList.filter((dept) => dept.id !== row.id));
    } catch (error) {
      console.error("Error deleting department:", error.message);
    }
  };

  const handleAddEditClose = () => {
    setAddEditDept(null);
    setSelectedDept({ name: "", hod: "" }); // Reset selected department
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (addEditDept === "add") {
        // Insertion code...
        const { data, error } = await supabase
          .from("department")
          .insert([selectedDept]);
        if (error) {
          throw error;
        }
        console.log("Data added:", data); // Log the newly added data
        if (data && data.length > 0) {
          console.log("Previous deptList:", deptList); // Log the previous deptList state
          setDeptList((prevDeptList) => [...prevDeptList, data[0]]);
          console.log("Updated deptList:", [...deptList, data[0]]); // Log the updated deptList state
        }
        handleAddEditClose(); // Close the popup after successful addition
      } else if (addEditDept === "edit") {
        // Update code...
        const { data, error } = await supabase
          .from("department")
          .update(selectedDept)
          .eq("id", selectedDept.id);
        if (error) {
          throw error;
        }
        console.log("Data updated:", data); // Log the updated data
        setDeptList((prevDeptList) =>
          prevDeptList.map((dept) =>
            dept.id === selectedDept.id ? selectedDept : dept
          )
        );
        console.log("Updated deptList:", deptList); // Log the updated deptList state
        handleAddEditClose(); // Close the popup after successful edit
      }
      // Toggle rerenderFlag to force re-render
      setRerenderFlag((prevFlag) => !prevFlag);
    } catch (error) {
      console.error("Error adding/editing department:", error.message);
      console.log("Insertion error:", error); // Log the entire error object
    }
  };


  
  
  
  
  

  const handleBulkAdd = async (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = async (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        // Insert the parsed data into the Supabase table
        const { data: insertedData, error } = await supabase
          .from("department")
          .insert(parsedData);

        if (error) {
          throw error;
        }

        // Update the local state with the newly inserted data
        setDeptList([...deptList, ...insertedData]);
        // Toggle rerenderFlag to force re-render
        setRerenderFlag((prevFlag) => !prevFlag);
      } catch (error) {
        if (error.code === "23505") {
          console.error("Error adding data to Supabase: Data already exists");
        } else {
          console.error("Error adding data to Supabase:", error.message);
        }
      }
    };
  };

  return (
    <div className="p-7 text-2xl text-black bg-blue-100 w-full font-semibold ">
      <h2>Department List</h2>
      <div className="flex gap-4">
        <button
          onClick={() => setAddEditDept("add")}
          className="bg-text-hover-color W-[60px] h-[40px] rounded-lg mt-1 text-center p-2 text-[20px] text-white font-normal"
        >
          Add
        </button>
        <button
          className="bg-text-hover-color w-[100px] h-[40px] rounded-lg mt-1 text-center p-2 text-[20px] text-white font-normal"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <div className="flex"> Bulk.Add</div>
        </button>
        <input
          id="fileInput"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleBulkAdd}
          style={{ display: "none" }}
        />
      </div>
      {fetchError && <p>{fetchError}</p>}
      <table className="pl-[10px] text-left table-auto bg-white border w-full  rounded-[25px] shadow-lg">
        <thead className="rounded-lg">
          <tr className="rounded-lg">
            <th className="px-8 py-4 font-semibold">Department</th>
            <th className="px-8 py-4 font-semibold">HOD</th>
            <th className="px-8 py-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="font-sans">
          {deptList.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? "bg-text-hover-bg" : ""}
            >
              <td className="px-8 py-4  font-light text-[20px]">{row.name}</td>
              <td className="px-8 py-4  font-light text-[20px]">{row.hod}</td>
              <td className="px-8 py-4  flex gap-6">
                <button className="mr-2" onClick={() => handleEdit(row)}>
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

      {/* Add/Edit Department Popup */}
      {addEditDept && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              {addEditDept === "add" ? "Add Department" : "Edit Department"}
            </h2>
            {/* Form for adding/editing department */}
            <form onSubmit={handleSubmit}>
              <select
                value={selectedDept.name} 
                placeholder="Department "
                onChange={(e) =>
                  setSelectedDept({ ...selectedDept, name: e.target.value })
                }
                className="border rounded-lg px-3 py-2 mb-2 w-full"
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
              </select>

              <input
                type="text"
                placeholder="HOD"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedDept.hod}
                onChange={(e) =>
                  setSelectedDept({ ...selectedDept, hod: e.target.value })
                }
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddEditClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  {addEditDept === "add" ? "Add" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departmentlist;
