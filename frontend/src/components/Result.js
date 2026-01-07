

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { Spinner, Card, Badge, Button, Modal } from "react-bootstrap";
const Result = () => {
  const [savedResults, setSavedResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/detections")
      .then((res) => {
        setSavedResults(res.data);
      })
      .catch((err) => console.error("Error fetching results:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDownloadPDF = async (result) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 40;
    let y = margin;
  
    // Outer border
    doc.setDrawColor(0, 123, 255);
    doc.setLineWidth(2);
    doc.rect(margin, y, pageW - 2 * margin, pageH - 2 * margin, 'S');
    y += 20;
  
    // Header
    const titleHeight = 40;
    doc.setFillColor(0, 123, 255).rect(margin, y, pageW - 2 * margin, titleHeight, 'F');
    doc.setFontSize(20).setTextColor(255)
       .text("NextGen Diagnostics", pageW / 2, y + 25, { align: "center" });
    y += titleHeight + 20;
  
    // Patient Details box
    const boxX = margin + 10;
    const boxY = y;
    const boxW = pageW - 2 * margin - 20;
    const boxH = 165;
    doc.setFillColor(245).rect(boxX, boxY, boxW, boxH, 'F');
    doc.setDrawColor(221).setLineWidth(1).rect(boxX, boxY, boxW, boxH, 'S');
  
    // Patient Details text
    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(0)
       .text("Patient Details", boxX + 15, boxY + 30)
       .setFont("helvetica", "normal");
    doc.text(`Name:   ${result.patientName}`, boxX + 15, boxY + 50);
    doc.text(`ID:     ${result.patientId}`,   boxX + 15, boxY + 70);
    doc.text(`Age:    ${result.patientAge}`,  boxX + 15, boxY + 90);
    doc.text(`Gender: ${result.patientGender || 'N/A'}`, boxX + 15, boxY + 110);
    if (result.detections?.[0]?.confidence != null) {
      const pct = (result.detections[0].confidence * 100).toFixed(1);
      doc.text(`Confidence: ${pct}%`, boxX + 15, boxY + 130);
    }
  
    // Fetch, convert and draw the annotated image
    if (result.image) {
      try {
        // 1. fetch the image URL (e.g. "/uploads/annotated_X.jpg")
        const response = await fetch(`http://localhost:5000${result.image}`);
        const blob     = await response.blob();
  
        // 2. blob → base64
        const base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.onerror   = reject;
          reader.readAsDataURL(blob);
        });
  
        // 3. draw the image
        const imgSize = 140;
        doc.addImage(
          `data:image/jpeg;base64,${base64Image}`,
          'JPEG',
          boxX + boxW - imgSize - 10,
          boxY + 10,
          imgSize,
          imgSize
        );
      } catch (err) {
        console.error("Could not load image for PDF:", err);
      }
    }
  
    // Move down and draw Diagnosis
    y += boxH + 20;
    doc.setFillColor(233, 247, 239).setDrawColor(40, 167, 69)
       .rect(margin + 10, y, boxW, 50, 'FD')
       .setFont("helvetica", "bold").setFontSize(14).setTextColor(40, 167, 69)
       .text("Diagnosis Result", margin + 20, y + 18)
       .setFont("helvetica", "normal")
       .text(
         result.detections?.length > 0
           ? "Positive for Uterine Leiomyosarcoma"
           : "No abnormality detected",
         margin + 20,
         y + 38
       );
  
    // Recommendations box
    y += 80;
    doc.setFillColor(255).setDrawColor(221)
       .rect(margin + 10, y, boxW, 80, 'FD')
       .setFont("helvetica", "bold").setFontSize(14).setTextColor(0)
       .text("Recommendations", margin + 20, y + 18)
       .setFont("helvetica", "normal");
    const recLines = doc.splitTextToSize(
      "Consult a specialist for further evaluation and treatment options. Suggested Tests: MRI, Blood Tests, Biopsy.",
      boxW - 20
    );
    doc.text(recLines, margin + 20, y + 38);
  
    // Footer
    doc.setFontSize(8).setTextColor(128)
       .text(`Generated on ${new Date().toLocaleString()}`, margin + 10, pageH - margin + 10);
  
    // Save PDF
    doc.save(`Patient_${result.patientId}_Report.pdf`);
  };
  
  
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`http://localhost:3001/detections/${deleteId}`);
      setSavedResults((prev) => prev.filter((r) => r._id !== deleteId));
    } catch (err) {
      console.error("Error deleting result:", err);
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary mb-4">Mitosis Detection Results</h2>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </div>
      ) : savedResults.length ? (
        <>
          <div className="row gx-4 gy-4">
            {savedResults.map((r, i) => {
              const confidence = r.detections?.[0]?.confidence ?? null;
              const confidenceText = confidence ? `${(confidence * 100).toFixed(1)}%` : "N/A";
              const diagnosis = r.detections?.length > 0 ? "Detected" : "Clear";

              return (
                <div key={r._id} className="col-md-6">
                 <Card className="h-100 shadow-sm border border-primary bg-dark-subtle rounded-6">

                    <Card.Header className={`text-white ${diagnosis === "Detected" ? "bg-danger" : "bg-success"}`}>
                      <strong>Patient {i + 1}</strong>
                      <Badge bg="light" text="dark" className="ms-3">
                        {diagnosis}
                      </Badge>
                    </Card.Header>

                    <Card.Body>
                      {/* Centered Image */}
                      {r.image && (
                        <div className="d-flex justify-content-center mb-4">
                        <img
  src={`http://localhost:5000${r.image}`}
  alt="Detected"
  className="rounded border"
  style={{ maxHeight: "150px", maxWidth: "100%", objectFit: "cover" }}
/>


                        </div>
                      )}

                      {/* Details Table */}
                      <table className="table table-borderless mb-4">
                        <tbody>
                          <tr><th>Name:</th><td>{r.patientName}</td></tr>
                          <tr><th>ID:</th><td>{r.patientId}</td></tr>
                          <tr><th>Age:</th><td>{r.patientAge}</td></tr>
                          <tr><th>Gender:</th><td>{r.patientGender || 'N/A'}</td></tr>
                          <tr><th>Confidence:</th><td>{confidenceText}</td></tr>
                        </tbody>
                      </table>
                    


                      <div className="d-flex justify-content-between">
                        <Button variant="outline-primary" onClick={() => handleDownloadPDF(r)}>
                          Download PDF
                        </Button>
                        <Button variant="outline-danger" onClick={() => confirmDelete(r._id)}>
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Confirmation Modal */}
          <Modal show={showModal} onHide={handleCancel} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this result? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirmed}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p className="text-center text-muted">No results found.</p>
      )}

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-outline-secondary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Result;




