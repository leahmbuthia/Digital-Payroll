import React from "react";
import "./Credential.scss";

const Credential = () => {
  return (
    <div>
        
      <div className="credentials-container">
        <div className="credentials-section"> {/* Add this div */}
          <h2>View Your Details</h2>
          <div className="credential-item">
            <label>Employee ID</label>
            <p>ID307686</p>
          </div>
          <div className="credential-item">
            <label>Department</label>
            <p>Ict</p>
          </div>
          <div className="credential-item">
            <label>Position</label>
            <p>Manager</p>
          </div>
          <div className="credential-item">
            <label>Gross Salary</label>
            <p>50,0000.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credential;
