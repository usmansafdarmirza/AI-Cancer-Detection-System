// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Save = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const result = location.state?.result || {};
//   const patient = location.state?.patient || {};
//   const [saving, setSaving] = useState(false);
//   const [saveMessage, setSaveMessage] = useState("");

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = `data:image/jpeg;base64,${result.image}`;
//     link.download = `${patient.name || "detection"}_result.jpg`;
//     link.click();
//   };

//   const handleSaveToDatabase = async () => {
//     try {
//       setSaving(true);
//       setSaveMessage("");

//       await axios.post("http://localhost:3001/save-detection", {
//         patientName: patient.name,
//         patientAge: patient.age,
//         patientId: patient.id,
//         image: result.image,
//         detections: result.detections,
//     });

//       setSaveMessage("Result saved to database successfully!");
//       // Optional: redirect to results page after save
//       setTimeout(() => navigate("/result"), 800);
//     } catch (error) {
//       console.error("Saving error:", error);
//       setSaveMessage("Error saving result. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!result.image) {
//     return (
//       <div className="container mt-4">
//         <div className="alert alert-warning">
//           No detection result found. Please upload an image first.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <div className="card shadow p-4">
//         <h3 className="text-center mb-4">Detection Results</h3>

//         <h5>Patient Details</h5>
//         <ul className="list-group mb-3 small">
//           <li className="list-group-item">
//             <strong>Name:</strong> {patient.name}
//           </li>
//           <li className="list-group-item">
//             <strong>Age:</strong> {patient.age}
//           </li>
//           <li className="list-group-item">
//             <strong>Patient ID:</strong> {patient.id}
//           </li>
//         </ul>

//         <div className="text-center mb-3">
//           <h5>Detected Image</h5>
//           <img
//             src={`data:image/jpeg;base64,${result.image}`}
//             alt="Detected"
//             className="rounded border p-1"
//             style={{ maxWidth: "300px" }}
//           />
//           <br />

//           <button
//             className="btn btn-outline-secondary btn-sm mt-2 me-2"
//             onClick={handleDownload}
//           >
//             Download Image
//           </button>

//           <button
//             className="btn btn-outline-primary btn-sm mt-2"
//             onClick={handleSaveToDatabase}
//             disabled={saving}
//           >
//             {saving ? "Saving…" : "Save to Database"}
//           </button>

//           {saveMessage && (
//             <div className="alert alert-info mt-3 small">{saveMessage}</div>
//           )}
//         </div>

//         <h5>Detections:</h5>
//         {result.detections?.length > 0 ? (
//           <ul className="list-group small">
//             {result.detections.map((d, i) => (
//               <li
//                 key={i}
//                 className="list-group-item d-flex justify-content-between align-items-center"
//               >
//                 {d.name}
//                 <span className="badge bg-success">
//                   {(d.confidence * 100).toFixed(2)}%
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className="alert alert-info small">
//             No mitosis detected in the image.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Save;


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Save = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result || {};
  const patient = location.state?.patient || {};
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

 

  const handleSaveToDatabase = async () => {
    try {
      setSaving(true);
      setSaveMessage("");
  
      // Log the data you're sending to check if gender is present
      console.log("Sending to backend:", {
        patientName: patient.name,
        patientAge: patient.age,
        patientId: patient.id,
        patientGender: patient.gender, // Check this value!
        image: result.image,
        detections: result.detections,
      });
  
      await axios.post("http://localhost:3001/save-detection", {
        patientName: patient.name,
        patientAge: patient.age,
        patientId: patient.id,
        patientGender: patient.gender,
        image: result.image,
        detections: result.detections,
      });
  
      setTimeout(() => {
        navigate("/result", { state: { patient, result } });
      }, 800);
    } catch (error) {
      console.error("Saving error:", error);
      setSaveMessage("Error saving result. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  

  if (!result.image) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          No detection result found. Please upload an image first.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Detection Results</h3>

        <h5>Patient Details</h5>
        <ul className="list-group mb-3 small">
          <li className="list-group-item">
            <strong>Name:</strong> {patient.name}
          </li>
          <li className="list-group-item">
            <strong>Age:</strong> {patient.age}
          </li>
          <li className="list-group-item">
            <strong>Patient ID:</strong> {patient.id}
          </li>
          <li className="list-group-item">
            <strong>Gender:</strong> {patient.gender}
          </li>
        </ul>

        <div className="text-center mb-3">
          <h5>Detected Image</h5>
          <img
  src={`http://localhost:5000${result.image}`}
  alt="Detected"
  className="rounded border p-1"
  style={{ maxWidth: "300px" }}
/>

          <br />

          

          <button
            className="btn btn-outline-primary btn-sm mt-2"
            onClick={handleSaveToDatabase}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save to Database"}
          </button>

          {saveMessage && (
            <div className="alert alert-info mt-3 small">{saveMessage}</div>
          )}
        </div>

        <h5>Detections:</h5>
        {result.detections?.length > 0 ? (
          <ul className="list-group small">
            {result.detections.map((d, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {d.name}
                <span className="badge bg-success">
                  {(d.confidence * 100).toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="alert alert-info small">
            No mitosis detected in the image.
          </div>
        )}
      </div>
    </div>
  );
};

export default Save;
