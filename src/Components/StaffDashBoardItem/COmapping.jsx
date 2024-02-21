import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import supabase  from '../../createClent'; // Import the Supabase client instance

function COmapping() {
  // State variables
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('');
  const [excelData, setExcelData] = useState([]);
  const [typeError, setTypeError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Load Excel data from Supabase on component mount
  useEffect(() => {
    fetchExcelData();
  }, []);

  // Function to fetch Excel data from Supabase
  const fetchExcelData = async () => {
    try {
      const { data, error } = await supabase.from('excel_data').select('*');
      if (error) {
        console.error('Error fetching data from Supabase:', error.message);
        setUploadStatus('Error fetching data. Please try again.');
      } else {
        // Convert data to a format compatible with the UI
        const formattedData = data.map(row => Object.values(row));
        setExcelData(formattedData);
        setUploadStatus(null);
      }
    } catch (error) {
      console.error('Error fetching data from Supabase:', error.message);
      setUploadStatus('Error fetching data. Please try again.');
    }
  };

  // Function to handle file upload
  const handleFile = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    const fileType = file.name.split('.').pop().toLowerCase();
    if (fileType !== 'xls' && fileType !== 'xlsx') {
      setTypeError('Please select only Excel file types');
      return;
    }

    try {
      const data = await readFile(file);
      // Convert data to a format compatible with the UI
      const formattedData = data.map(row => Object.values(row));
      setExcelData(formattedData);
      setTypeError(null);
      setUploadStatus(null);
    } catch (error) {
      console.error('Error reading file:', error);
      setTypeError('Error reading file. Please try again.');
    }
  };

  // Function to read Excel file
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target.result;
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        resolve(data);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  // Function to update data in Supabase
  const updateDataInSupabase = async () => {
    try {
      // Convert data to Supabase format
      const formattedData = excelData.map(row => {
        const obj = {};
        row.forEach((value, index) => {
          obj[index.toString()] = value;
        });
        return obj;
      });

      const { data, error } = await supabase.from('excel_data').upsert(formattedData);
      if (error) {
        console.error('Error updating data in Supabase:', error.message);
        setUploadStatus('Error updating data. Please try again.');
      } else {
        console.log('Data updated successfully:', data);
        setUploadStatus('Data updated successfully.');
      }
    } catch (error) {
      console.error('Error updating data in Supabase:', error.message);
      setUploadStatus('Error updating data. Please try again.');
    }
  };

  // Function to handle data editing
  const handleDataEdit = (newValue, rowIndex, columnIndex) => {
    const updatedData = excelData.map((row, index) => {
      if (index === rowIndex) {
        return row.map((cell, idx) => {
          return idx === columnIndex ? newValue : cell;
        });
      }
      return row;
    });
    setExcelData(updatedData);
  };

  // Function to handle subject input change
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  // Function to handle semester input change
  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct filename based on subject and semester
    const fileName = `${subject}_${semester}.xlsx`;
    // Call function to upload file with constructed filename
    updateDataInSupabase();
  };

  return (
    <div className="wrapper">
      <h3 className="text-xl font-semibold">Upload CO mapping Excel</h3>

      {/* Subject input */}
      <input type="text" value={subject} onChange={handleSubjectChange} placeholder="Enter subject" />

      {/* Semester input */}
      <input type="text" value={semester} onChange={handleSemesterChange} placeholder="Enter semester" />

      {/* File upload input */}
      <input type="file" className="form-control border rounded py-2 px-3 mr-2" required onChange={handleFile} />

      {/* Error message for invalid file type */}
      {typeError && <div className="alert alert-danger mt-2" role="alert">{typeError}</div>}

      {/* Upload button */}
      <button className="btn btn-primary mt-2" onClick={handleSubmit}>Update Supabase</button>

      {/* Upload status */}
      {uploadStatus && <div className="alert mt-2" role="alert">{uploadStatus}</div>}

      {/* Display Excel data */}
      <div className="viewer bg-gray-300 p-4 flex justify-center items-center">
        <table className="table">
          <thead>
            <tr>
              {excelData.length > 0 && excelData[0].map((header, index) => <th key={index}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {excelData.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                {rowData.map((cellData, cellIndex) => (
                  <td key={cellIndex}>
                    <input
                      type="text"
                      value={cellData}
                      onChange={(e) => handleDataEdit(e.target.value, rowIndex, cellIndex)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default COmapping;
