import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FetchMember: React.FC = () => {
  const [idNumber, setIdNumber] = useState("");
  const [memberData, setMemberData] = useState<any>(null);

  const handleFetch = async () => {
    try {
      // Updated URL to match the server endpoint
      const response = await axios.get(`https://community-management-1.onrender.com/fetch-member`, {
        params: { ID_number: idNumber },
      });

      if (response.status === 200) {
        setMemberData(response.data);
        toast.success("Member fetched successfully");
      } else {
        toast.error("Member not found");
        setMemberData(null); // Clear previous data
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error("Member does not exist");
      } else {
        console.error("Error fetching member:", error);
        toast.error("Failed to fetch member");
      }
      setMemberData(null); // Clear previous data
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Fetch Member</h1>
      <div className="d-flex justify-content-center mt-4">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Enter ID Number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleFetch}>
            Fetch
          </button>
        </div>
      </div>
      {/* Display the member information below the ID field */}
      {memberData && (
        <div className="mt-4">
          <h3>Member Details</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Full Name:</strong> {memberData.full_name}
            </li>
            <li className="list-group-item">
              <strong>ID Number:</strong> {memberData.id_number}
            </li>
            <li className="list-group-item">
              <strong>Mobile Contact:</strong> {memberData.contact_number}
            </li>
            <li className="list-group-item">
              <strong>Age:</strong> {memberData.age}
            </li>
            <li className="list-group-item">
              <strong>Location:</strong> {memberData.location}
            </li>
            <li className="list-group-item">
              <strong>Role:</strong> {memberData.role}
            </li>
            <li className="list-group-item">
              <strong>Marital Status:</strong> {memberData.marital_status}
            </li>
          </ul>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default FetchMember;
