import React from "react";
//import {BASE_URL} from '../constants';
import logo from '../logo.png';


class Header extends React.Component {
    render() {
      return <div className="header1" >
          
      <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            

            

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            <img src={logo} alt="Logo" style={{    width: 50, height: 50, borderRadius:25, marginRight:15}} />
        
              <div className="navbar-nav align-items-center nav-title">
              
                  GreenRide
              </div>
         

              <ul className="navbar-nav flex-row align-items-center ms-auto">
            
               

          
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">John Doe</span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      
                        <i className="bx bx-user me-2"></i>
                        <span className="align-middle">My Profile</span>
                      
                    </li>
                    <li>
                      
                        <i className="bx bx-cog me-2"></i>
                        <span className="align-middle">Settings</span>
                      
                    </li>
                   
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="auth-login-basic.html">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Log Out</span>
                      </a>
                    </li>
                  </ul>
                </li>
          
              </ul>
            </div>
          </nav>
    </div>;
    }
  }

export default Header;