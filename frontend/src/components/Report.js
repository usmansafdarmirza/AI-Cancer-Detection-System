import React from 'react';
import '../styles/Report.css'; 

const MedicalReportResult = ({ reportData }) => {
  if (!reportData) {
    return <div className="container">No report data available.</div>;
  }

  return (
    <div className="container">
      <h2>Medical Report</h2>
      <div className="form-group">
        <label>Patient Name:</label>
        <p>{reportData.patientName}</p>
      </div>
      <div className="form-group">
        <label>Age:</label>
        <p>{reportData.age}</p>
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <p>{reportData.gender}</p>
      </div>
      <div className="form-group">
        <label>Contact:</label>
        <p>{reportData.contact}</p>
      </div>
      <div className="form-group">
        <label>Medical History:</label>
        <p>{reportData.medicalHistory}</p>
      </div>
      <div className="form-group">
        <label>Diagnosis:</label>
        <p>{reportData.diagnosis}</p>
      </div>
      <div className="form-group">
        <label>Prescribed Medication:</label>
        <p>{reportData.prescribedMedication}</p>
      </div>
    </div>
  );
};

export default MedicalReportResult;

