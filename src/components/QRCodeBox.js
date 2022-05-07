import React, { useState, useRef  } from 'react';
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
  const [CycleQR, setCycleQR] = useState('');
  const [qrtype, setQrtype] = useState(props.qrtype);
  const [on, toggle] = useTorchLight(streamRef.current);


  const qraction =  props.qraction;
  //const heading = props.heading;


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

    setCycleQR(qrCode);
    setQrtype("user");

    console.log("CycleQR",CycleQR);


  };

  const IssueCycleAPI = async (qrCode, qrtype, qraction) => {

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

      setCycleQR("");
      setQrtype("cycle");
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




   







 

  //console.log("props", ApiMethods.loginApi);

  return (
    <>
    <div  style={{ alignItems: 'center' }}>
    <h6 className="card-subheader">Scan {qrtype} QR Code </h6>
    <div className='card1' style={{width:250, height:250, align:'center', margin:'auto'}}>
      <QrReader
       constraints={{
        facingMode: 'environment'
    }}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
              if(qrtype === 'stand') {
                SelfAtendanceAPI(result?.text, qrtype, qraction );
              }
              else if(qrtype === 'cycle' && qraction==="issue") {
                IssueCycle(result?.text, qrtype, qraction );
              }
              else if(qrtype === 'user' && qraction==="issue" ) {
                IssueCycleAPI(result?.text, qrtype, qraction );
              }
              else if(qrtype === 'cycle' && qraction==="deposit" ) {
                DepositCycleAPI(result?.text, qrtype, qraction );
              }
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      </div>

      <i className="tf-icons bx bx-torch"></i>
      

      <button onClick={toggle}>{on ? 'Disable Torch' : 'Enable Torch'}</button>
      </div>
      <p>{data}</p>

      <ToastContainer/>

    </>
  );
};

export default QRCodeBox;
