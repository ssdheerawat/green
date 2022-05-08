import React from "react";
//import {BASE_URL} from '../constants';
import logo from '../logo.png';
import Cookies from "js-cookie";




class Header extends React.Component {

     //const loginStand = Cookies.get("loginStand");

    render() {

      let userDetailStr = Cookies.get("userDetail");
      if(userDetailStr && userDetailStr !=="") {
        
      }
      else {
        userDetailStr = "{}";
      }

      const userDetail = JSON.parse(userDetailStr);
      console.log("userDetail",userDetail);
      

      

      function logOutUser() {
        console.log("log outtttttt");

      }


      return <div className="header1" >
          
      <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            

            

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            <img src={logo} alt="Logo" style={{    width: 38, height: 38, borderRadius:25, marginRight:15}} />
        
              <div className="navbar-nav align-items-center nav-title">
                  GreenRide
              </div>
         
              {typeof userDetail !== "undefined" && typeof userDetail.fullname !== "undefined"  ? 
              <ul className="navbar-nav flex-row align-items-center ms-auto">
            
               

          
                <li className="nav-item navbar-dropdown dropdown-user dropdown">

                <span className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <div className="avatar avatar-online">
                      <img src={userDetail.profile_photo_full} alt="..." className="w-px-40 h-auto rounded-circle" />
                    </div>
                    </span>
                 
               
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">{userDetail.fullname}</span>
                            <small className="text-muted">Stand Attendant</small>
                          </div>
                        </div>
                      
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                        <a className="dropdown-item" href="auth-login-basic.html">
                        <i className="bx bx-user me-2"></i>
                        <span className="align-middle">My Profile</span>
                        </a>
                      
                    </li>
        
                    <li>
                      <span onClick={logOutUser} className="dropdown-item" >
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Log Out</span>
                      </span>
                    </li>
                  </ul>
                </li>
          
              </ul>
              :
              null
              }
            </div>
          </nav>
    </div>;
    }
  }

export default Header;