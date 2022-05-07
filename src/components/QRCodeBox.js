import React, { useState,useEffect, useRef  } from 'react';
import { QrReader } from 'react-qr-reader';
import { useTorchLight } from '@blackbox-vision/use-torch-light';
import {ApiMethods} from '../constants';
import { api } from "../api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";




const QRCodeBox = (props) => {

  let navigate = useNavigate();
  const streamRef = useRef(null);
  const [data, setData] = useState('No result');


  const [on, toggle] = useTorchLight(streamRef.current);
  const [isloading, setIsloading] = useState(false);

  const [code, setCode] = useState(null);
  const [showDialog, setDiaglog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [precScan, setPrecScan] = useState("");
  const [selected, setSelected] = useState("environment");
  const [errorMessage, setErrorMessage] = useState(null);


  const qrtype = props.qrtype;



  
  

  const qraction =  props.qraction;
  const heading = props.heading;


  const SelfAtendanceAPI = async (qrCode, qrtype, qraction) => {
    const response = await api({
      url: ApiMethods.SelfAtendance,
      methode: "POST",
      data: {"stand_id": qrCode,
      "lat": "102457",
      "lng": "102457"},
    });

    console.log("response===", response);

    if (response.status) {

        if(response.data.action === 'out'){
            Cookies.set(
                "loginStand",
                ""
              );

        }
        else {
            Cookies.set(
                "loginStand",
                response.data.stand_id
              );
        }

            
        toast.success(response.message);
        navigate("/dashboard", { replace: true });
    }else {
        // setisLoading(flase);
        toast.error(response.message);
        // alert("Something went wrong");
      }
  };

  const IssueCycle = async (qrCode, qrtype, qraction) => {

    //setIsloading(true);
    console.log("Get Cycle QR ");

    Cookies.set(
      "cycleQrCode",
      qrCode
    );



    navigate("/issueapi", { replace: true });

  


 

   


  };

  const IssueCycleAPI = async (qrCode, qrtype, qraction) => {

    
    let CycleQR = Cookies.get("cycleQrCode");
    const response = await api({
      url: 'staff/issue',
      methode: "POST",
      data: {"cycle_id": CycleQR,"user_id": qrCode,
      "latitude":"4234","longitude":"34234324"},
    });

    console.log("response===", response);

    if (response.status) {

        toast.success(response.message);
        navigate("/dashboard", { replace: true });
    }else {

     
        // setisLoading(flase);
        toast.error(response.message);
        // alert("Something went wrong");
      }
  };

  const DepositCycleAPI = async (qrCode, qrtype, qraction) => {

    const response = await api({
      url: 'staff/deposit',
      methode: "POST",
      data: {"cycle_id": qrCode,
      "latitude":"4234","longitude":"34234324"},
    });

    console.log("response===", response);

    if (response.status) {

        toast.success(response.message);
        navigate("/dashboard", { replace: true });
    }else {

        toast.error(response.message);
      }
  };

  


  if(qrtype === 'stand') {
    //SelfAtendanceAPI('c3RhbmRfNQ==', qrtype, qraction );
  }
  if(qrtype === 'cycle') {
    

    if(qraction === 'issue') {
      //IssueCycle('MTAwMg==', qrtype, qraction );
    }
    else {
      //DepositCycleAPI('MTAwMg==', qrtype, qraction );
    }
    
    //
  }
  if(qrtype === 'user') {
    //IssueCycleAPI('dXNlcl8x', qrtype, qraction ); //user_1
  }



  
   


  useEffect(() => {
    //setIsloading(false);
    }, []);


   
    const handleScan = async (scanData) => {
      console.log(`loaded data data`, scanData);
      if (scanData && scanData !== "" && !showDialog && !processing) {
        console.log(`loaded >>>`, scanData);
        setPrecScan(scanData);
        //await fetchData({ qr: scanData });
      }
    };
    const handleError = (err) => {
      console.error(err);
    };


 

  //console.log("props", ApiMethods.loginApi);

  return (
    <>
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>
        Last Scan:{precScan}
        {selected}
      </h2>
      <select onChange={(e) => setSelected(e.target.value)}>
        <option value={"environment"}>Back Camera</option>
        <option value={"user"}>Front Camera</option>
      </select>
      {showDialog && (
        <div className="dialog">
          <div className="dialog-content">
            <div className="close">
              <button
                onClick={() => {
                  setCode(null);
                  setErrorMessage(null);
                  setDiaglog(false);
                  setProcessing(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {errorMessage && (
              <div className="errorMessage">
                <h2>{errorMessage}</h2>
              </div>
            )}
           
          </div>
        </div>
      )}
      {/* {code && <h2>{code.text}</h2>} */}
      {!showDialog && !processing && (
        <QrReader
          facingMode={selected}
          delay={500}
          onError={handleError}
          onScan={handleScan}
          // chooseDeviceId={()=>selected}
          style={{ width: 250, heigth: 250 }}
        />
      )}
    </div>
      

      <ToastContainer/>

    </>
  );
};

export default QRCodeBox;
