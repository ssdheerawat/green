import React, {useState, useEffect} from 'react';
import { api } from "../api";

import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Login = (props) => {

    let navigate = useNavigate();

    useEffect(() => {
        let token = Cookies.get("token");
        if (token) {
            navigate("/dashboard", { replace: true });
        }
      }, []);


    // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };



 
 /* const handleSubmit11 = async (e) => {
    e.preventDefault();
    const error = await handleValidate();
    setCheck(true);
    setIsLoading(true);
    if (!error.username.length && !error.password.length) {
      //setIsLoading(true);
      const response = await api({
        url: "users/login",
        method: "POST",
        data: loginData,
      });

      if (response.status) {
        setIsLoading(false);

        Cookies.set("user_id", response.data.id);

        Cookies.set(
          "token",
          response.data.token,
          remember ? { expires: 7 } : ""
        );
        if (remember) {
          Cookies.set(
            "detail",
            encryptCodes(
              JSON.stringify({
                userName: loginData.username,
                userpassword: loginData.password,
              })
            )
          );
          Cookies.set("remember", remember);
        } else {
          Cookies.remove("detail");
          Cookies.remove("remember");
        }

        if (response.data.is_password_updated == 0) {
          setOldUser(true);
        } else {
          toast.success(response.message);
          router.push("/vendor_account");
        }
        //setBusinessFormData();
      } else {
        // setisLoading(flase);
        toast.error(response.message);
        // alert("Something went wrong");
      }
    } else {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  */


  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    console.log(uname);
 


    const response = await api({
        url: "staff/login",
        method: "POST",
        data: { "phone":uname.value, "password":pass.value },
      });

      console.log("response", response);


      if (response.status) {
        //setIsLoading(false);

        Cookies.set("user_id", response.data.id);

        Cookies.set(
          "token",
          response.data.token
        );
      
          Cookies.remove("detail");
          Cookies.remove("remember");
        

          console.log("response.message",response.message);
          toast.success(response.message);
          navigate("/dashboard", { replace: true });
        
        //setBusinessFormData();
      } else {
        // setisLoading(flase);
        toast.error(response.message);
        // alert("Something went wrong");
      }


    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
   // if (userData) {
     // if (userData.password !== pass.value) {
        // Invalid password
       // setErrorMessages({ name: "pass", message: errors.pass });
     // } else {
        setIsSubmitted(true);
     // }
    //} else {
      // Username not found
      //setErrorMessages({ name: "uname", message: errors.uname });
    //}
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


  return (
    <>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <ToastContainer />
    </div>
    </>
  );
};

export default Login;
