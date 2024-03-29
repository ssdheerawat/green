import React, {useEffect, useState} from 'react';
import { api } from "../api";

import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import logo from '../logo.png';


const Login = (props) => {

    const [showPassword, setShowPassword] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        let token = Cookies.get("token");
        if (token) {
            navigate("/dashboard", { replace: true });
        }
      }, [navigate]);


    // React States
  //const [errorMessages, setErrorMessages] = useState({});
  //const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info




  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    console.log(uname);
 
    let access_token = Cookies.get("access_token");

    const response = await api({
        url: "staff/login",
        method: "POST",
        data: { "phone":uname.value, "password":pass.value, "access_token":access_token },
      });

      console.log("response", response);


      if (response.status) {
        //setIsLoading(false);

          Cookies.set("user_id", response.data.id);
          Cookies.set("role", response.data.role_id);
          //Cookies.set("standAccess", response.data.standAccess);
          //standAccess
          Cookies.set( "userDetail",JSON.stringify(response.data));

          Cookies.set("token",response.data.token);
          Cookies.set("access_token",response.data.access_token);
      
          //Cookies.remove("detail");
          //Cookies.remove("remember");
        

          console.log("response.message",response.message);
          toast.success(response.message);
          navigate("/dashboard", { replace: true });
        
        //setBusinessFormData();
      } else {
        // setisLoading(flase);
        toast.error(response.message);
        //alert("Something went wrong");
      }


    // Find user login info
    //const userData = database.find((user) => user.username === uname.value);


  };


  const ForgotPassword = async() => {

    navigate("/forgot-password", { replace: true });

};


function handleShowHidePassword() {
  setShowPassword(!showPassword);
}

  // Generate JSX code for error message



  return (
    <>
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
    
          <div className="card">
            <div className="card-body">
      
              <div className="app-brand justify-content-center">
               
              
                  <div className="card mb-3" style={{width:100, borderRadius:45}}>
                    <img className="card-img-top" src={logo} alt="Card cap" />

                      </div>

                 

          
                 
               
              </div>
          
              <h4 className="mb-2 text-center">Welcome to MyBicycles! 👋</h4>
              <p className="mb-4 text-center">Please sign-in to your account and start the adventure</p>

              <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit} method="POST">
                <div className="mb-3 text-left" >
                  <label className="form-label">Mobile No</label>
                  <input
                    type="text"
                    className="form-control"
                    id="uname"
                    name="uname"
                    placeholder="Enter your Mobile No"
                    required
                  />
              
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" >Password</label>
                   
                      <small style={{'cursor':'pointer'}} onClick={()=>ForgotPassword()}>Forgot Password?</small>
                    
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control"
                      name="pass"
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
               
                <div className="mb-3">
                  <button className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
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

export default Login;
