import React, { useState, useEffect } from 'react';
import supabase from '../../createClent';
import * as XLSX from 'xlsx';

const StudentList = () => {
  const [fetchError, setFetchError] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [addEditStudent, setAddEditStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState({
    id: null,
    name: '',
    reg_no: '',
    admission_no: '',
    gender: '',
    physics: '',
    chemistry: '',
    maths: '',
    average: '',
    higher_secondary: '',
    keam: '',
    clg_rank: '',
    proof: '',
    remark: '',
    batch: '',
    dept: ''
  });
  const [rerenderFlag, setRerenderFlag] = useState(false); // New state variable
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const { data, error } = await supabase
          .from('studentlist')
          .select();
        if (error) {
          throw error;
        }
        setStudentList(data || []);
        setFetchError(null);
      } catch (error) {
        console.error('Error fetching student list:', error.message);
        setFetchError('Could not fetch data');
        setStudentList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentList();
  }, [rerenderFlag]); 
  // Include rerenderFlag in the dependency array
  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  if (fetchError) {
    return <div>Error: {fetchError}</div>; // Render error message if fetch fails
  }
  const handleEdit = (student, add = false) => {
    setSelectedStudent(student);
    setAddEditStudent(add ? 'add' : 'edit');
  };

  const handleDelete = async (student) => {
    try {
      await supabase
        .from('studentlist')
        .delete()
        .eq('id', student.id);
      setStudentList(studentList.filter((s) => s.id !== student.id));
    } catch (error) {
      console.error('Error deleting student:', error.message);
    }
  };

  const handleAddEditClose = () => {
    setAddEditStudent(null);
    setSelectedStudent({
      id: null,
      name: '',
      reg_no: '',
      admission_no: '',
      gender: '',
      physics: '',
      chemistry: '',
      maths: '',
      average: '',
      higher_secondary: '',
      keam: '',
      clg_rank: '',
      proof: '',
      remark: '',
      batch: '',
      dept: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (addEditStudent === 'add') {
        const newStudentId = Math.floor(Math.random() * 1000000); // Generate random integer ID

        // Check if the generated ID already exists
        const existingStudent = studentList.find(student => student.id === newStudentId);
        if (existingStudent) {
          alert("ID already exists. Please try again.");
          return;
        }

        const newStudent = { ...selectedStudent, id: newStudentId };
        const { data, error } = await supabase
          .from('studentlist')
          .insert([newStudent]);
        if (error) {
          throw error;
        }
        console.log('Student added successfully:', data);
        // Ensure data is not null before attempting to access it
        if (data) {
          setStudentList([...studentList, data[0]]);
        }
        handleAddEditClose();
      } else if (addEditStudent === 'edit') {
        const { data, error } = await supabase
          .from('studentlist')
          .update(selectedStudent)
          .eq('id', selectedStudent.id);
        if (error) {
          throw error;
        }
        console.log('Student edited successfully:', data);
        // Ensure data is not null before attempting to access it
        if (data) {
          const updatedList = studentList.map(student => {
            if (student.id === selectedStudent.id) {
              return selectedStudent;
            }
            return student;
          });
          setStudentList(updatedList);
        }
        handleAddEditClose();
      }
      // After adding or editing student, set rerenderFlag to trigger re-render
      setRerenderFlag(prevFlag => !prevFlag);
    } catch (error) {
      console.error('Error adding/editing student:', error.message);
    }
  };

  const handleBulkAdd = async (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = async (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        // Insert the parsed data into the Supabase table
        const { data: insertedData, error } = await supabase.from('studentlist').insert(parsedData);

        if (error) {
          throw error;
        }

        // Update the local state with the newly inserted data
        setStudentList([...studentList, ...insertedData]);
        // After adding students, set rerenderFlag to trigger re-render
        setRerenderFlag(prevFlag => !prevFlag);
      } catch (error) {
        if (error.code === '23505') {
          console.error('Error adding data to Supabase: Data already exists');
        } else {
          console.error('Error adding data to Supabase:', error.message);
        }
      }
    };
  };

  return (
    <div className='p-7 text-2xl text-black bg-blue-100 w-full font-semibold overflow-x-auto'>
      <h2>Student List</h2>
      <button
        onClick={() => handleEdit({}, true)}
        className="bg-text-hover-color w-[60px] h-[40px] rounded-lg mt-1 text-center p-2 text-[20px] text-white font-normal"
      >
        Add
      </button> 
      <div style={{ position: 'relative', display: 'inline-block' ,margin:'2' }}>
  <input
    id="fileInput"
    type="file"
    accept=".xlsx, .xls"
    onChange={handleBulkAdd}
    style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
  />
  <button
    className="px-2 bg-text-hover-color w-[100px] h-[40px] rounded-lg mt-1 text-center p-2 text-[20px] text-white font-normal"
    onClick={() => document.getElementById('fileInput').click()}
  >
    Bulk
  </button>
</div>

      
      {fetchError && <p>{fetchError}</p>}
      <table className="pl-[10px] text-left table-auto bg-white border w-full rounded-[25px] shadow-lg">
        <thead className="rounded-lg">
          <tr className="rounded-lg">
            <th className="px-4 py-2 font-semibold ">Name</th>
            <th className="px-4 py-2 font-semibold">Registration Number</th>
            <th className="px-4 py-2 font-semibold">Admission Number</th>
            <th className="px-4 py-2 font-semibold">Gender</th>
            <th className="px-4 py-2 font-semibold">Physics</th>
            <th className="px-4 py-2 font-semibold">Chemistry</th>
            <th className="px-4 py-2 font-semibold">Maths</th>
            <th className="px-4 py-2 font-semibold">Average</th>
            <th className="px-4 py-2 font-semibold">Higher Secondary</th>
            <th className="px-4 py-2 font-semibold">KEAM</th>
            <th className="px-4 py-2 font-semibold">College Rank</th>
            <th className="px-4 py-2 font-semibold">Proof</th>
            <th className="px-4 py-2 font-semibold">Remark</th>
            <th className="px-4 py-2 font-semibold">Batch</th>
            <th className="px-4 py-2 font-semibold">Department</th>
            <th className="px-4 py-2 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="font-sans">
          {studentList.map((student, index) => (
            <tr key={student.id} className={index % 2 === 0 ? 'bg-text-hover-bg' : ''}>
              <td className="px-4 py-2 font-light text-[20px]">{student.name}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.reg_no}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.admission_no}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.gender}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.physics}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.chemistry}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.maths}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.average}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.higher_secondary}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.keam}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.clg_rank}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.proof}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.remark}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.batch}</td>
              <td className="px-4 py-2 font-light text-[20px]">{student.dept}</td>
              <td className="px-4 py-2 flex gap-6">
                <button className="mr-2" onClick={() => handleEdit(student)}>
                  <i className="fa-solid fa-pencil text-blue-500"></i>
                </button>
                <button onClick={() => handleDelete(student)}>
                  <i className="fa-solid fa-trash text-red-500"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Student Popup */}
      {addEditStudent && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              {addEditStudent === 'add' ? 'Add Student' : 'Edit Student'}
            </h2>
            {/* Form for adding/editing student */}
            <form className='grid grid-cols-3' onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.name}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Registration Number"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.reg_no}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, reg_no: e.target.value })}
              />
              <input
                type="text"
                placeholder="Admission Number"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.admission_no}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, admission_no: e.target.value })}
              />
              <input
                type="text"
                placeholder="Gender"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.gender}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, gender: e.target.value })}
              />
              <input
                type="text"
                placeholder="Physics"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.physics}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, physics: e.target.value })}
              />
              <input
                type="text"
                placeholder="Chemistry"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.chemistry}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, chemistry: e.target.value })}
              />
              <input
                type="text"
                placeholder="Maths"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.maths}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, maths: e.target.value })}
              />
              <input
                type="text"
                placeholder="Average"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.average}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, average: e.target.value })}
              />
              <input
                type="text"
                placeholder="Higher Secondary"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.higher_secondary}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, higher_secondary: e.target.value })}
              />
              <input
                type="text"
                placeholder="KEAM"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.keam}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, keam: e.target.value })}
              />
              <input
                type="text"
                placeholder="College Rank"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.clg_rank}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, clg_rank: e.target.value })}
              />
              <input
                type="text"
                placeholder="Proof"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.proof}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, proof: e.target.value })}
              />
              <input
                type="text"
                placeholder="Remark"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.remark}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, remark: e.target.value })}
              />
              {/* <input
                type="text"
                placeholder="Batch"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.batch}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, batch: e.target.value })}
              /> */} 
               <select
                value={selectedStudent.batch} 
                placeholder="Advisor batch "
                onChange={(e) => setSelectedStudent({ ...selectedStudent, batch: e.target.value })}
                className="border rounded-lg px-3 py-2 mb-2 w-full"
              >
                <option value="">Select Batch</option>
                <option value="2020-2024">2020-2024</option>
                <option value="2021-2025">2021-2025</option>
                <option value="2022-2026">2022-2026</option>
                <option value="2023-2027">2023-2027</option>

              </select>
              {/* <input
                type="text"
                placeholder="Department"
                className="border rounded-lg px-3 py-2 mb-2 w-full"
                value={selectedStudent.dept}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, dept: e.target.value })}
              /> */} 
              <select
                value={selectedStudent.dept} 
                placeholder="Department "
                onChange={(e) => setSelectedStudent({ ...selectedStudent, dept: e.target.value })}
                className="border rounded-lg px-3 py-2 mb-2 w-full"
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
              </select>
              {/* Ensure the value and onChange are set for each field */}
              <button
                type="button"
                onClick={handleAddEditClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                {addEditStudent === 'add' ? 'Add' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
