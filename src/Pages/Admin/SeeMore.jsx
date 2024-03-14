import React from 'react'
import './SeeMore.scss'

const SeeMore = () => {
    return (
        <div className="leah">
          <div className="tit">
            <div className="title">
              <h2>Profile details</h2>
              <div className="profile">
                {/* <h2>Prfile details</h2> */}
                <div className="profile-details">
                  <img src={Avator} alt="" />
                </div>
    
                <div className="list">
                  <p>
                    <strong>First Name:</strong> Leah
                  </p>
                  <p>
                    <strong>Last Name:</strong> Nyambura
                  </p>
                  <p>
                    <strong>Address:</strong> 214 South Kinangop
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> 10/05/2000
                  </p>
                  <p>
                    <strong>Email:</strong> leah@gmail.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +254 705999
                  </p>
                  <p>
                    <strong>Gender:</strong> Female
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default SeeMore