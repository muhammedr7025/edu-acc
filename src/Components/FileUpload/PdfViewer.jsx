import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const PDFViewer = ({ pdfURL }) => {
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleError = (error) => {
    console.error("Error loading PDF:", error);
    setError(error.message || "Failed to load PDF");
  };

  return (
    <div className="bg-red-100 ">
      {error && <div>Error: {error}</div>}
      <Document
        file={pdfURL}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={handleError}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page width='1000' 
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ))}
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default PDFViewer;
