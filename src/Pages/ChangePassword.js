import React, {useEffect, useState} from 'react';
import { api } from "../api";

import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import logo from '../logo.png';


const ChangePassword = (props) => {

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        let token = Cookies.get("token");
        if (token) {
            //navigate("/green/dashboard", { replace: true });
        }
      }, [navigate]);


    // React States
  //const [errorMessages, setErrorMessages] = useState({});
  //const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info




  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { password, password_confirmation } = document.forms[0];
    console.log(password_confirmation);
 


    const response = await api({
        url: "staff/change-password",
        method: "POST",
        data: { "password":password.value, "password_confirmation":password_confirmation.value },
      });

      console.log("response", response);


      if (response.status) {
        //setIsLoading(false);

  
          Cookies.set(
            "successMsg",
            response.message
          );
          navigate("/green/dashboard", { replace: true });
        

      } else {
        toast.error(response.message);

      }

  };

  // Generate JSX code for error message

  function handleShowHidePassword() {
    setShowPassword(!showPassword);
  }

  function handleShowHidePassword2() {
    setShowPassword2(!showPassword2);
  }

  return (
    <>
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
    
          <div className="card">
            <div className="card-body">
      
              <div className="app-brand justify-content-center">
               
              
                  <div className="card mb-3">
                    <img className="card-img-top" src={logo} alt="Card cap" />

                      </div>

                 

          
                 
               
              </div>
          
              <h4 className="mb-2 text-center">Change Password</h4>

              <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit} method="POST">
              
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" >New Password</label>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                  
                  <span className="input-group-text cursor-pointer" onClick={() => handleShowHidePassword()}>
                      {showPassword ? 
                      <i className="bx bx-show"></i>
                      :
                      <i className="bx bx-hide"></i>
                      }
                      </span>

                  </div>
                </div>

                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" >Confirm Password</label>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type={showPassword2 ? "text" : "password"}
                      id="password_confirmation"
                      className="form-control"
                      name="password_confirmation"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                  
                    <span className="input-group-text cursor-pointer" onClick={() => handleShowHidePassword2()}>
                      {showPassword2 ? 
                      <i className="bx bx-show"></i>
                      :
                      <i className="bx bx-hide"></i>
                      }
                      </span>
                  </div>
                </div>
               
                <div className="mb-3">
                  <button className="btn btn-primary d-grid w-100" type="submit">Save</button>
                </div>
              </form>

         
            </div>
          </div>
   
        </div>
      </div>
    </div>
    <ToastContainer/>
    
    </>
  );
};

export default ChangePassword;
