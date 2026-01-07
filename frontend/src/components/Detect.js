

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Detect = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [patientName, setPatientName] = useState("");
    const [patientAge, setPatientAge] = useState("");
    const [patientId, setPatientId] = useState("");
    const [patientGender, setPatientGender] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nameError, setNameError] = useState(null); // Error state for name
    const [ageError, setAgeError] = useState(null); // Error state for age
    const [idError, setIdError] = useState(null); // Error state for patient ID
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && !file.type.startsWith("image/")) {
            setError("Only image files are allowed.");
            setImage(null);
            setPreview(null);
            return;
        }
        setError(null);
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const validateInputs = () => {
        let isValid = true;
        setError(null);
        setNameError(null);
        setAgeError(null);
        setIdError(null);
    
        // Validate Name
        if (!patientName.trim()) {
            setNameError("Patient name is required.");
            isValid = false;
        } else if (/[^a-zA-Z\s]/.test(patientName)) {  // Disallow special characters and numbers
            setNameError("Patient name can only contain letters and spaces.");
            isValid = false;
        }
    
        // Validate Age
        if (!patientAge.trim()) {
            setAgeError("Patient age is required.");
            isValid = false;
        } else if (patientAge < 0 || patientAge > 120) {
            setAgeError("Please enter a valid age between 0 and 120.");
            isValid = false;
        }
    
        // Validate Patient ID (no special characters allowed)
        if (!patientId.trim()) {
            setIdError("Patient ID is required.");
            isValid = false;
        } else if (/[^a-zA-Z0-9]/.test(patientId)) {
            setIdError("Patient ID cannot contain special characters.");
            isValid = false;
        }
    
        // Validate other fields
        if (!patientGender || !image) {
            setError("Please fill all fields and select an image.");
            isValid = false;
        }
    
        return isValid;
    };
    

    const handleUpload = async () => {
        if (!validateInputs()) {
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", patientName.trim());
        formData.append("age", patientAge);
        formData.append("id", patientId.trim());
        formData.append("gender", patientGender);

        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:5000/detect", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            navigate("/save", {
                state: {
                    result: response.data,
                    patient: {
                        name: patientName.trim(),
                        age: patientAge,
                        id: patientId.trim(),
                        gender: patientGender
                    }
                }
            });

            // Clear the form
            setImage(null);
            setPreview(null);
            setPatientName("");
            setPatientAge("");
            setPatientId("");
            setPatientGender("");

        } catch (err) {
            console.error("Detection error:", err);
            setError("Detection failed. Check your server or internet connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4 p-4 bg-light">
                        <h3 className="text-center mb-4 text-primary fw-bold">
                            <i className="bi bi-search-heart me-2"></i>Mitosis Detection
                        </h3>

                        {error && <div className="alert alert-danger">{error}</div>}

                        {/* Patient Name */}
                        <div className="mb-3">
                            <label className="form-label">Patient Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                required
                            />
                            {nameError && <small className="text-danger">{nameError}</small>}
                        </div>

                        {/* Age, ID, Gender */}
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label className="form-label">Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={patientAge}
                                    onChange={(e) => setPatientAge(e.target.value)}
                                    required
                                />
                                {ageError && <small className="text-danger">{ageError}</small>}
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Patient ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={patientId}
                                    onChange={(e) => setPatientId(e.target.value)}
                                    required
                                />
                                {idError && <small className="text-danger">{idError}</small>}
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Gender</label>
                                <select
                                    className="form-select"
                                    value={patientGender}
                                    onChange={(e) => setPatientGender(e.target.value)}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="mb-3">
                            <label className="form-label">Upload an Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={handleFileChange}
                                required
                            />
                        </div>

                        {/* Image Preview */}
                        {preview && (
                            <div className="text-center mb-3">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="img-thumbnail rounded-3 shadow-sm"
                                    style={{ maxWidth: "200px" }}
                                />
                            </div>
                        )}

                        {/* Detect Button */}
                        <button
                            className="btn btn-primary w-100"
                            onClick={handleUpload}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Detecting...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-activity me-2"></i>
                                    Detect Mitosis
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detect;


