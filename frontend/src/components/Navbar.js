

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior

    if (location.pathname !== "/") {
      navigate("/", { replace: false }); // Navigate to home first
      setTimeout(() => {
        document.getElementById("DetailsSection")?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Delay to ensure the section exists
    } else {
      document.getElementById("DetailsSection")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-lg">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          style={{ marginLeft: "-60px" }}  // Increased the margin to move the logo further left
        >
          <img
            src="logo.png"
            alt="Logo"
            style={{ height: "35px", width: "auto" }} // Adjust height as needed
          />
          <span className="fw-bold fs-5">NextGen Diagnostics</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto fw-semibold">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/detect">Detect</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/result">Results</Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white bg-transparent border-0 p-2"
                style={{ lineHeight: "inherit" }} // Ensure alignment with other links
                onClick={handleAboutClick}
              >
                About
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

