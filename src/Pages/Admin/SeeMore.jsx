import React, { useRef } from 'react';
import './SeeMore.scss'
import Avator from '../../../src/assets/Avatar.png'
import edit from "../../assets/edit-512.webp";
import del from "../../assets/del.png"

const SeeMore = () => {
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Do something with the selected file, such as uploading or displaying preview
  };


      return (
        <div className="container1">
          <div class="form-container1">
            <div className="profileedit">
          <img src={Avator} alt="" />
          <img src={edit} alt="" className='edit'/>
          </div>
            <div className="form-img">

            <h2>Employee Details</h2>
            
            <div className="img">
            <img src={edit} alt="" />
            <img src={del} alt="" />
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
              <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
            </form>

          </div>
        </div>
      );
    };

export default SeeMore