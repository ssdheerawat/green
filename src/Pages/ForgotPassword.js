import React, {useState, useEffect} from 'react';
import { api } from "../api";

import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import logo from '../logo.png';


const ForgotPassword = (props) => {

    let navigate = useNavigate();
    const [IsOTPSend, SetIsOTPSend] = useState(false);
    const [MobileNo, SetMobileNo] = useState("");
    const [otp, setOTP] = useState("");
    
    useEffect(() => {
        let token = Cookies.get("token");
        if (token) {
            navigate("/green/dashboard", { replace: true });
        }
      }, [navigate]);


    // React States
  //const [errorMessages, setErrorMessages] = useState({});
  //const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info




  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { mobile } = document.forms[0];
    console.log(mobile);
 


    const response = await api({
        url: "staff/send-otp",
        method: "POST",
        data: { "mobile":mobile.value },
      });

      console.log("response", response);


      if (response.status) {
        //setIsLoading(false);
          SetIsOTPSend(true);
          SetMobileNo(mobile.value);

          console.log("response.message",response.message);
          toast.success(response.message);
         
        
        //setBusinessFormData();
      } else {
        // setisLoading(flase);
        toast.error(response.message);
        //alert("Something went wrong");
      }


  };

  const handleVerifyOTP = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { otp } = document.forms[0];
    console.log(otp);
 


    const response = await api({
        url: "staff/vetify-otp",
        method: "POST",
        data: { "mobile":MobileNo,  "otp":otp.value },
      });

      console.log("response", response);


      if (response.status) {

          Cookies.set("user_id", response.data.id);
          Cookies.set( "userDetail",JSON.stringify(response.data));
          Cookies.set("token",response.data.token);

          console.log("response.message",response.message);
          toast.success(response.message);
          navigate("/green/dashboard", { replace: true });

      } else {
        // setisLoading(flase);
        toast.error(response.message);
        //alert("Something went wrong");
      }


  };

  const handleOTPChange = event => {
    setOTP(event.target.value);
    console.log('value is:', event.target.value);
  };



 

  // Generate JSX code for error message



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

              {IsOTPSend ?

<div>
          
<h4 className="mb-2 text-center">Verify OTP</h4>
<p className="mb-4 text-center">Enter your OTP</p>

<form id="formAuthenticationOtp" className="mb-3" onSubmit={handleVerifyOTP} method="POST">
  <div className="mb-3 text-left" >
    <label className="form-label">Enter OTP</label>
    <input
      type="text"
      className="form-control"
      name="otp"
      placeholder="Enter your OTP"
      maxLength={4}
      onChange={handleOTPChange}
      value={otp}
      required
    />

  </div>
  
  <div className="mb-3">
    <button className="btn btn-primary d-grid w-100" type="submit">Submit</button>
  </div>
</form>
</div>


              :
              <div>
          
              <h4 className="mb-2 text-center">Forgot Password</h4>
              <p className="mb-4 text-center">Enter your mobile number and we will send you OTP</p>

              <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit} method="POST">
                <div className="mb-3 text-left" >
                  <label className="form-label">Mobile No</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter your Mobile No"
                    required
                  />
              
                </div>
                
                <div className="mb-3">
                  <button className="btn btn-primary d-grid w-100" type="submit">Submit</button>
                </div>
              </form>
              </div>
              }

         
            </div>
          </div>
   
        </div>
      </div>
    </div>
    <ToastContainer/>
    
    </>
  );
};

export default ForgotPassword;
