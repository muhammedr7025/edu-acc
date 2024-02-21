
import React, { useState, useEffect } from "react";
import supabase from "../../createClent";
import * as XLSX from "xlsx";

const SubjectList = () => {
  const [fetchError, setFetchError] = useState(null);
  const [subjectList, setSubjectList] = useState([]);
  const [staffList, setStaffList] = useState([]); // Initialize staffList state
  const [addEditSubject, setAddEditSubject] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState({
    id: null,
    code: "",
    staff: "",
    name: ""
  });
  const [rerenderFlag, setRerenderFlag] = useState(false);

  useEffect(() => {
    const fetchSubjectList = async () => {
      try {
        const { data: subjectData, error: subjectError } = await supabase
          .from("Subject")
          .select();
        if (subjectError) {
          throw subjectError;
        }
        setSubjectList(subjectData || []);
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching subject list:", error.message);
        setFetchError("Could not fetch data");
        setSubjectList([]);
      }
    };

    const fetchStaffList = async () => {
      try {
        const { data: staffData, error: staffError } = await supabase
          .from("stafflist")
          .select("name");
        if (staffError) {
          throw staffError;
        }
        setStaffList(staffData.map((staff) => staff.name) || []);
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching staff list:", error.message);
        setFetchError("Could not fetch data");
        setStaffList([]);
      }
    };

    fetchSubjectList();
    fetchStaffList();
  }, [rerenderFlag]);

  const handleEdit = (row) => {
    setSelectedSubject(row);
    setAddEditSubject("edit");
  };

  const handleDelete = async (row) => {
    try {
      await supabase.from("Subject").delete().eq("id", row.id);
      setSubjectList(subjectList.filter((subject) => subject.id !== row.id));
    } catch (error) {
      console.error("Error deleting subject:", error.message);
    }
  };

  const handleAddEditClose = () => {
    setAddEditSubject(null);
    setSelectedSubject({ id: null, code: "", staff: "", name: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (addEditSubject === "add") {
        // Omit id when adding a new subject
        const { data, error } = await supabase
          .from("Subject")
          .insert([{ name: selectedSubject.name, code: selectedSubject.code, staff: selectedSubject.staff }]);
        if (error) {
          throw error;
        }
        if (data && data.length > 0) {
          setSubjectList((prevSubjectList) => [...prevSubjectList, data[0]]);
        }
        handleAddEditClose(); // Close the popup after successful addition
      } else if (addEditSubject === "edit") {
        const { data, error } = await supabase
          .from("Subject")
          .update(selectedSubject)
          .eq("id", selectedSubject.id);
        if (error) {
          throw error;
        }
        setSubjectList((prevSubjectList) =>
          prevSubjectList.map((subject) =>
            subject.id === selectedSubject.id ? selectedSubject : subject
          )
        );
        handleAddEditClose(); // Close the popup after successful edit
      }
      setRerenderFlag((prevFlag) => !prevFlag); // Toggle rerenderFlag to force re-render
    } catch (error) {
      console.error("Error adding/editing subject:", error.message);
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

        const { data: insertedData, error } = await supabase
          .from("Subject")
          .insert(parsedData);

        if (error) {
          throw error;
        }

        setSubjectList([...subjectList, ...insertedData]);
        setRerenderFlag((prevFlag) => !prevFlag); // Toggle rerenderFlag to force re-render
      } catch (error) {
        console.error("Error adding data to Supabase:", error.message);
      }
    };
  };

  return (
    <div className="p-7 text-2xl text-black bg-blue-100 w-full font-semibold ">
      <h2>Subject List</h2>
      <div className="flex gap-4">
        <button
          onClick={() => setAddEditSubject("add")}
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
            <th className="px-8 py-4 font-semibold">Name</th>
            <th className="px-8 py-4 font-semibold">Code</th>
            <th className="px-8 py-4 font-semibold">Staff</th>
            <th className="px-8 py-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="font-sans">
          {subjectList.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? "bg-text-hover-bg" : ""}
            >
              <td className="px-8 py-4  font-light text-[20px]">{row.name}</td>
              <td className="px-8 py-4  font-light text-[20px]">{row.code}</td>
              <td className="px-8 py-4  font-light text-[20px]">{row.staff}</td>
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

      {/* Add/Edit Subject Popup */}
      {addEditSubject && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              {addEditSubject === "add" ? "Add Subject" : "Edit Subject"}
            </h2>
            {/* Form for adding/editing subject */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedSubject.name}
                onChange={(e) =>
                  setSelectedSubject({ ...selectedSubject, name: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Code"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedSubject.code}
                onChange={(e) =>
                  setSelectedSubject({ ...selectedSubject, code: e.target.value })
                }
              />

              
              <select
                value={selectedSubject.staff}
                onChange={(e) =>
                  setSelectedSubject({ ...selectedSubject, staff: e.target.value })
                }
                className="border rounded-lg px-3 py-2 mb-2 w-full"
              >
                <option value="">Select Staff</option>
                {staffList.map((staffName) => (
                  <option key={staffName} value={staffName}>
                    {staffName}
                  </option>
                ))}
              </select>
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
                  {addEditSubject === "add" ? "Add" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default SubjectList;