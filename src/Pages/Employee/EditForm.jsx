import React from "react";
import "./EditForm.scss"
import edit from "../../assets/edit-512.webp";
import del from "../../assets/trash-bin.webp"
// import delete  from "../../assets/trash-bin.webp"
// import del from "../../assets/trash-bin.webp"

const EditForm = () => {
  return (
    <div className="container">
      <div class="form-container">
        <div className="form-img">
        <h2>Employee Details</h2>
        <div className="img">
        <img src={edit} alt="" />
        {/* <img src={delete} alt="" /> */}
        {/* <img src={del} alt="" /> */}
        </div>
        </div>
        <form id="employee-form">
          <div class="form-group">
            <label for="first-name">First Name:</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              value="Leah"
              disabled></input>
          </div>
          <div class="form-group">
            <label for="last-name">Last Name:</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              value="Nyambura"
              disabled
            ></input>
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value="214 South Kinangop"
              disabled
            ></input>
          </div>
          <div class="form-group">
            <label for="dob">Date of Birth:</label>
            <input
              type="text"
              id="dob"
              name="dob"
              value="10/05/2000"
              disabled
            ></input>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value="leah@gmail.com"
              disabled
            ></input>
          </div>
          <div class="form-group">
            <label for="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value="+254 705999"
              disabled
            ></input>
          </div>
          <div class="form-group">
            <label for="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value="Female"
              disabled
            ></input>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default EditForm;
