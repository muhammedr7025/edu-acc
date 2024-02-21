import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import supabase from '../../createClent';
import { Document, Page } from 'react-pdf';  
import { pdfjs } from 'react-pdf'; 
import './pdf.worker'
import PDFViewer from "../FileUpload/PdfViewer";

function Upyq() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedPdfURL, setSelectedPdfURL] = useState(null);
  const [showPdfPopup, setShowPdfPopup] = useState(false); 
  const [staffOptions, setStaffOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  const popUpRef = useRef(null); // Reference to the PDF pop-up window

  useEffect(() => {
    fetchStaffAndSubjects();
    // Adding event listener to handle clicks outside the PDF popup
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 
  
  useEffect(() => {
    if (selectedStaff) {
      fetchSubjectsByStaff(selectedStaff);
    }
  }, [selectedStaff]);

  useEffect(() => {
    fetchPDFFiles();
  }, [selectedStaff, selectedSubject]);

  const fetchStaffAndSubjects = async () => {
    try {
      const { data: staffData, error: staffError } = await supabase
        .from("stafflist")
        .select("name");
      if (staffError) {
        console.error("Error fetching staff:", staffError.message);
      } else {
        setStaffOptions(staffData);
      }
    } catch (error) {
      console.error("Error fetching staff:", error.message);
    }
  };

  const fetchSubjectsByStaff = async (staffName) => {
    try {
      const { data: subjectData, error: subjectError } = await supabase
        .from("Subject")
        .select("name")
        .eq("staff", staffName);
      if (subjectError) {
        console.error("Error fetching subjects by staff:", subjectError.message);
      } else {
        setSubjectOptions(subjectData);
      }
    } catch (error) {
      console.error("Error fetching subjects by staff:", error.message);
    }
  };

  const fetchPDFFiles = async () => {
    try {
      if (!selectedStaff || !selectedSubject) {
        // If either staff or subject is not selected, do not fetch PDF files
        return;
      }

      const { data, error } = await supabase.storage
        .from("UPYQ")
        .list(`pdfs/${selectedStaff}/${selectedSubject}`);
      if (error) {
        console.error("Error fetching PDF files:", error.message);
      } else {
        setPdfFiles(data);
      }
    } catch (error) {
      console.error("Error fetching PDF files:", error.message);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleUpload = async () => {
    for (const file of selectedFiles) {
      await uploadPDF(file);
    }
    setSelectedFiles([]);
  };

  const uploadPDF = async (file) => {
    try {
      const { data, error } = await supabase.storage
        .from("UPYQ")
        .upload(`pdfs/${selectedStaff}/${selectedSubject}/${file.name}`, file);
      if (error) {
        console.error("Error uploading file:", error.message);
      } else {
        console.log("File uploaded successfully:", data.Key);
        // Fetch PDF files again after uploading
        fetchPDFFiles(); 
        // Update pdfFiles state with the newly uploaded file
        setPdfFiles([...pdfFiles, { name: file.name }]);
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };
  
  const handleSubjectClick = (subjectName) => {
    setSelectedSubject(subjectName);
    fetchPDFFiles();
  };

  const handlePdfClick = (pdfFileName) => {
    const supabaseBaseUrl = 'https://jubfonzpooabcktpgfip.supabase.co/storage/v1/object/public/UPYQ/pdfs/';
    const pdfURL = `${supabaseBaseUrl}${selectedStaff}/${selectedSubject}/${pdfFileName}`;
    
    // Open the PDF pop-up window
    setSelectedPdfURL(pdfURL);
    setShowPdfPopup(true);
  };

  const handleClosePdfPopup = () => {
    // Close the PDF pop-up window
    setSelectedPdfURL(null);
    setShowPdfPopup(false);
  };

  const handleClickOutside = (event) => {
    // Close the PDF pop-up window if clicked outside of it
    if (popUpRef.current && !popUpRef.current.contains(event.target)) {
      handleClosePdfPopup();
    }
  };

  return (
    <div className="w-full p-[2.5rem] bg-gray-100 rounded-lg shadow-lg  overflow-y-scroll"> 
      <div className="text-2xl pb-4 font-medium">Previous University Question Paper</div>
      <div className="flex mb-4">
        {/* Staff Selection Dropdown */}
        <select 
          className="mr-4"
          onChange={(e) => setSelectedStaff(e.target.value)}
        >
          <option value="">Select Staff</option>
          {staffOptions.map((staff, index) => (
            <option key={index} value={staff.name}>{staff.name}</option>
          ))}
        </select>
      </div>
      {subjectOptions.length > 0 && (
        <div className="flex flex-wrap rounded-[50%]">
          {subjectOptions.map((subject, index) => (
            <div key={index} className="bg-blue-200 p-2 m-2 rounded cursor-pointer" onClick={() => handleSubjectClick(subject.name)}>
              <div className="md:w-[25rem] h-[5rem] bg-white rounded-md shadow-lg hover:bg-red-200">
                <div className="flex justify-between px-4 py-2">
                  <div className="flex flex-col my-3.5">
                    <div className="text-[grey] text-xl"></div>
                    <div className="text-blue-500 text-2xl">{subject.name}</div>
                  </div>
                  <div className="flex py-[10px]">
                    <div className="w-[2.5rem] md:w-[2.5rem] h-[2.5rem] bg-light-blue rounded-[25%] text-center py-[5%]">
                      -{`>`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        accept=".pdf"
        multiple
        className="mb-4"
        onChange={handleFileChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleUpload}
      >
        Upload PDF(s)
      </button>
      {pdfFiles.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Uploaded PDF Files:</h2>
          <ul className="flex flex-col ">
            {pdfFiles.map((file, index) => (
              <li 
                key={index}
                className=" mt-2 flex bg-blue-300 w-[1000px] h-[50px] justify-between p-2"
              >
                <a
                  className="text-center py-2"
                  target="_top"
                  rel="noopener noreferrer"
                  onClick={() => handlePdfClick(file.name)}
                >
                  {file.name}
                </a> 
                <a
                  href={`https://jubfonzpooabcktpgfip.supabase.co/storage/v1/object/public/UPYQ/pdfs/${selectedStaff}/${selectedSubject}/${file.name}?t=${file.last_modified}`}
                  download
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg flex items-center"
                >
                  <i className="mr-1 fas fa-download"></i>
                  Download
                </a>
              </li>
            ))}
          </ul>  
        </div>
      )}
      {/* PDF Pop-up Window */}
      {showPdfPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-hidden z-50">
          <div ref={popUpRef} className="bg-white p-4 rounded-lg max-w-full max-h-full overflow-auto">
            <button
              className="absolute top-2 right-2 text-xl text-gray-600"
              onClick={handleClosePdfPopup}
            >
              &times;
            </button>
            <div className="max-w-full max-h-full overflow-auto">
              <PDFViewer pdfURL={selectedPdfURL} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upyq;
