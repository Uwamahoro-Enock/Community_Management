import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrarPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [mobileContact, setMobileContact] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        fullName,
        idNumber,
        mobileContact,
        age,
        location,
        role,
        maritalStatus,
      });

      if (response.status === 201) {
        // Clear all fields
        setFullName("");
        setIdNumber("");
        setMobileContact("");
        setAge("");
        setLocation("");
        setRole("");
        setMaritalStatus("");
        // Show success message
        toast.success("User registered successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          toast.error("User already exists");
        } else {
          console.error("Error registering user:", error);
          setError("Failed to register user");
          toast.error("Failed to register user");
        }
      } else {
        console.error("Error registering user:", error);
        setError("Failed to register user");
        toast.error("Failed to register user");
      }
    }
  };

  const handleFetch = () => {
    navigate("/Fetch-Member");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 bg-light shadow-sm">
        <h1 className="text-center mb-4">Registrar's Page</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="idNumber" className="form-label">
              ID Number
            </label>
            <input
              type="text"
              className="form-control"
              id="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
              pattern="\d{16}"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobileContact" className="form-label">
              Mobile Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="mobileContact"
              value={mobileContact}
              onChange={(e) => setMobileContact(e.target.value)}
              required
              pattern="\d{10}"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <input
              type="text"
              className="form-control"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="maritalStatus" className="form-label">
              Marital Status
            </label>
            <select
              className="form-select"
              id="maritalStatus"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              required
            >
              <option value="">Select...</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleFetch}
            >
              Fetch Member
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrarPage;
