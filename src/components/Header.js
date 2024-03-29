import React, {useState, useEffect} from "react";
//import {BASE_URL} from '../constants';
import logo from '../logo.png';
import Cookies from "js-cookie";
//import { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
//
//import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = (props) => {

     //const loginStand = Cookies.get("loginStand");


      const [isLoggedin, setIsLoggedin] = useState(false);
      const [UserDetail, setUserDetail] = useState([]);

      const [date, setDate] = React.useState(new Date());

      //Replaces componentDidMount and componentWillUnmount
      React.useEffect(() => {
       var timerID = setInterval( () => tick(), 1000 );
       return function cleanup() {
           clearInterval(timerID);
         };
      });
     
        function tick() {
         setDate(new Date());
        }

      let navigate = useNavigate();

      useEffect(() => {



      let userDetailStr = Cookies.get("userDetail");
      if(userDetailStr && userDetailStr !=="") {

        setIsLoggedin(true);
         
      }
      else {
        userDetailStr = "{}";
      }

      let UserDetailArr = JSON.parse(userDetailStr);

      setUserDetail(UserDetailArr);
      //console.log("userDetail",UserDetail);
    }, [ navigate]);
      

      

     

      const logOutUser = async() => {

        


          Cookies.remove("user_id");

          Cookies.remove("userDetail");
          Cookies.remove("token");
          setIsLoggedin(false);

          navigate("/", { replace: true });

    
  


        
      };


      return ( <div className="header1" >
          
          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            

            

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            <Link to="/dashboard" className="dash-link" ><img src={logo} alt="Logo" style={{    width: 38, height: 38, borderRadius:25, marginRight:15, backgroundColor:'#fff'}} /></Link>
        
              <div className="navbar-nav align-items-center nav-title">
               MyBicycles V2<br/>
               <small style={{fontSize:10}}>{date.toLocaleTimeString('en-IN', {timeZone: 'Asia/Kolkata', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</small>
              </div>
         
              {isLoggedin   ? 
              <ul className="navbar-nav flex-row align-items-center ms-auto">

            
               

          
                <li className="nav-item navbar-dropdown dropdown-user dropdown">

                <span className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <div className="avatar avatar-online">
                      <img src={UserDetail.profile_photo_full} alt="..." className="w-px-40 h-auto rounded-circle" />
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
                            <span className="fw-semibold d-block">{UserDetail.fullname}</span>

                            { UserDetail?.role_id === 1  ?
                            <small className="text-muted">Super Admin</small>
                            : UserDetail?.role_id === 2  ?
                            <small className="text-muted">Manager</small>
                            : UserDetail?.role_id === 3  ?
                            <small className="text-muted">Supervisor</small>
                            :
                            <small className="text-muted">Stand Attendant</small>
                            }         
                          </div>
                        </div>
                      
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>

                    <li>
                      <Link to="/change-password" className="dropdown-item">
                          <i className="bx bx-lock-open me-2"></i>
                          <span className="align-middle">Change Password</span>
                      </Link>
                    </li>
                  
        
                    <li>
                       
                      <span onClick={()=>logOutUser()} className="dropdown-item" >
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
    </div>
      )
  }

export default Header;