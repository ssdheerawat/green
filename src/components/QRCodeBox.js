import React, { useState,useEffect, useRef  } from 'react';
import { QrReader } from 'react-qr-reader';
import { useTorchLight } from '@blackbox-vision/use-torch-light';
//import {ApiMethods} from '../constants';
import { api } from "../api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

//import Alert from 'react-popup-alert'





const QRCodeBox = (props) => {

  let navigate = useNavigate();
  const streamRef = useRef(null);
  const [data, setData] = useState('');
  const [QrCode, setQrCode] = useState('');


  const [on, toggle] = useTorchLight(streamRef.current);
  const [IsQRloading, setIsQRloading] = useState(false);
  const [TransferList, setTransferList] = useState([]);





  const qrtype = props.qrtype;



  
  

  const qraction =  props.qraction;
  const heading = props.heading;


  const SelfAtendanceAPI = async (qrCode, position) => {
    const response = await api({
      url: "staff/self-atendance",
      methode: "POST",
      data: {"stand_id": qrCode,
      "lat": position.latitude,
      "lng": position.longitude},
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
                response.data.title
              );
        }

        Cookies.set(
          "successMsg",
          response.message
        );

        

            
        toast.success(response.message);
        navigate("/green/dashboard", { replace: true });
    }else {
        
        toast.error(response.message);
        setIsQRloading(false);
        // alert("Something went wrong");
      }
  };

  const StandOpenAPI = async (qrCode, position) => {



    const response = await api({
      url: 'staff/stand-inout',
      methode: "POST",
      data: {"stand_id": qrCode,"lat": position.latitude,"lng": position.longitude},
    });

    console.log("response===", response);
    

    if (response.status) {

        if(response.data.action === 'out'){
            Cookies.set( "standOpen",  "no" );
        }
        else {
          Cookies.set( "standOpen",  "yes" );
        }
        Cookies.set(
          "successMsg",
          response.message
        );
        toast.success(response.message);
        navigate("/green/dashboard", { replace: true });
    }else {
        setIsQRloading(false);
        toast.error(response.message);
      }
  };

  const IssueCycle = async (qrCode) => {

    console.log("Get Cycle QR ");

    Cookies.set(
      "cycleQrCode",
      qrCode
    );



    navigate("/green/issueapi", { replace: true });



  };

  const IssueCycleAPI = async (qrCode, position) => {

    
    let CycleQR = Cookies.get("cycleQrCode");
    const response = await api({
      url: 'staff/issue',
      methode: "POST",
      data: {"cycle_id": CycleQR,"user_id": qrCode,"latitude": position.latitude,"longitude": position.longitude},
    });

    console.log("response===", response);
    Cookies.set(
      "cycleQrCode",
      ""
    );

    if (response.status) {

        
        Cookies.set(
          "successMsg",
          response.message
        );

        toast.success(response.message);
        navigate("/green/dashboard", { replace: true });
    }else {


        Cookies.set(
          "errorMsg",
          response.message
        );


        toast.error(response.message);

        // alert("Something went wrong");
        navigate("/green/issue", { replace: true });
      }
  };

  const DepositCycleAPI = async (qrCode, position) => {

    const response = await api({
      url: 'staff/deposit',
      methode: "POST",
      data: {"cycle_id": qrCode,
      "latitude": position.latitude,"longitude": position.longitude},
    });

    console.log("response===", response);

    if (response.status) {

       Cookies.set(
        "successMsg",
        response.message
      );
      

        toast.success(response.message);
        navigate("/green/dashboard", { replace: true });
    }else {
        setIsQRloading(false);
        toast.error(response.message);
      }
  };

  const TransferCycleAPI = async (qrCode, position) => {



    const response = await api({
      url: 'staff/transfer',
      methode: "POST",
      data: {"cycle_id": qrCode,
      "latitude": position.latitude,"longitude": position.longitude},
    });

    console.log("response===", response);
    setIsQRloading(false);

    if (response.status) {

     
        let TransferListArr = TransferList;
        if(TransferListArr.includes(response.data.cycle_no)) {
          toast.error("Cycle ["+ response.data.cycle_no+ "] already added into  your list!");
        }
        else {
          TransferListArr.push(response.data.cycle_no);
          setTransferList(TransferListArr);
          console.log("TransferList==",TransferList);
          //cycle_no

          toast.success(response.message);
        }

    }else {
        
        toast.error(response.message);
      }
  };

  const ReceiveCycleAPI = async (qrCode, position) => {



    const response = await api({
      url: 'staff/receive',
      methode: "POST",
      data: {"cycle_id": qrCode,"latitude": position.latitude,"longitude": position.longitude},
    });

    console.log("response===", response);
    setIsQRloading(false);

    if (response.status) {

        toast.success(response.message);

    }else {

        toast.error(response.message);
      }
  };

  const TransferAll = async () => {



    const response = await api({
      url: 'staff/transferall',
      methode: "POST",
      data: {"TransferList": TransferList},
    });

    console.log("response===", response);
    setIsQRloading(false);

    if (response.status) {

      Cookies.set(
        "successMsg",
        response.message
      );
      

        toast.success(response.message);
        navigate("/green/dashboard", { replace: true });

    }else {

        toast.error(response.message);
      }
  };


  const ExchangeCycle = async (qrCode) => {

    console.log("Get Cycle QR ");

    Cookies.set(
      "cycleQrCode",
      qrCode
    );



    navigate("/green/exchangeapi", { replace: true });



  };

  const ExchangeCycleAPI = async (qrCode, position) => {

    
    let CycleQR = Cookies.get("cycleQrCode");
    const response = await api({
      url: 'staff/exchange',
      methode: "POST",
      data: {"old_cycle_id": CycleQR,"new_cycle_id": qrCode,"latitude": position.latitude,"longitude": position.longitude},
    });

    console.log("response===", response);
    Cookies.set(
      "cycleQrCode",
      ""
    );

    if (response.status) {

        
        Cookies.set(
          "successMsg",
          response.message
        );

        toast.success(response.message);
        navigate("/green/dashboard", { replace: true });
    }else {


        Cookies.set(
          "errorMsg",
          response.message
        );


        toast.error(response.message);

        // alert("Something went wrong");
        navigate("/green/exchange", { replace: true });
      }
  };

  const CheckQrCodeAPI = async (qrCode) => {

    const response = await api({
      url: 'staff/check_qr_code',
      methode: "POST",
      data: {"qrCode": qrCode},
    });

    if (response.status) {
      setQrCode(response.data.qrCode);
    }else {
        toast.error(response.message);
      }
  };

  
  

  

  //CheckQrCodeAPI('c3RhbmRfNQ==');
  if(qrtype === 'stand') {
    //SelfAtendanceAPI('c3RhbmRfNQ==', qrtype, qraction );
    /// StandOpenAPI('c3RhbmRfNQ==', qrtype, qraction );
  }
  if(qrtype === 'cycle') {
    

    if(qraction === 'issue') {
      //IssueCycle('MTAwMg==', qrtype, qraction );
    }
    else if(qraction === 'deposit') {
      //DepositCycleAPI('MTAwMg==', qrtype, qraction );
    }
    else if(qraction === 'transfer') {
       //TransferCycleAPI('MzEwMg==', qrtype, qraction );
    }
    else if(qraction === 'receive') {

      //ReceiveCycleAPI('MTAwMg==', qrtype, qraction );
      //ReceiveCycleAPI('MzEwNg==', qrtype, qraction );  //3106
      // MzEwNg==
    }
    
    //
  }
  if(qrtype === 'user') {
    //IssueCycleAPI('dXNlcl8x', qrtype, qraction ); //user_1
  }



  
   


  useEffect(() => {

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      },
      function(error) {
          toast.error(error.message);
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );

    let errorMsg = Cookies.get("errorMsg");

    if(errorMsg !== "") {
      toast.error(errorMsg);
      Cookies.set(
        "errorMsg",
        ""
        );

    }
    }, []);


   



 

  //console.log("props", ApiMethods.loginApi);

  return (
    <>
    <div  style={{ alignItems: 'center', textAlign:'center' }}>
    <h6 className="card-subheader">{heading}</h6>
    <div className='card1' style={{width:300, height:250, align:'center', margin:'auto'}}>




      {QrCode && 
      <div>QR Code:  {QrCode}</div> 
      }

    

    {IsQRloading ? <div className="loadingQr">
    <div>Please Wait....</div>
  </div> :




<QrReader
constraints={{
   facingMode: 'environment'
}}
onResult={(result, error) => {
   if (!!result ) {
     if(IsQRloading){
       console.log("Already Loading ....");
     }
     else {
      setIsQRloading(true);
       setData(result?.text);


       navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);


            if(qrtype === 'stand' && qraction==="open") {
              SelfAtendanceAPI(result?.text, position.coords );
            }
            else if(qrtype === 'stand' && qraction==="inout" ) {
             StandOpenAPI(result?.text, position.coords );
             }
            else if(qrtype === 'cycle' && qraction==="issue") {
              IssueCycle(result?.text, position.coords );
            }
            else if(qrtype === 'user' && qraction==="issue" ) {
              IssueCycleAPI(result?.text, position.coords );
            }
            else if(qrtype === 'cycle' && qraction==="deposit" ) {
              DepositCycleAPI(result?.text, position.coords );
            }
            else if(qrtype === 'cycle' && qraction === 'transfer') {
              TransferCycleAPI(result?.text,  position.coords );
            }
            else if(qrtype === 'cycle' && qraction === 'receive') {
             ReceiveCycleAPI(result?.text,  position.coords );
           }
          else if(qrtype === 'cycle' && qraction==="exchange_old") {
            ExchangeCycle(result?.text, position.coords );
          }
          else if(qrtype === 'cycle' && qraction==="exchange_new" ) {
            ExchangeCycleAPI(result?.text, position.coords );
          }
          else if(qrtype === 'qr' && qraction==="qrCheck" ) {
            //setQrCode(result?.text );
            CheckQrCodeAPI(result?.text );
          }



        },
        function(error) {
            toast.error(error.message);
            console.error("Error Code = " + error.code + " - " + error.message);
          }
        );

       



        
     }
   }

   if (!!error) {
     
     console.info("QR error=====",error);
     //setData(error);
   }
 }}
 
 delay={1000}

 style={{ width: 300, height:250 }}
/>
  
  }

    

    
      
      </div>

      <i className="tf-icons bx bx-torch"></i>
      

      <button onClick={toggle}>{on ? 'Disable Torch' : 'Enable Torch'}</button>
      </div>
      <p>{data}</p>


      {qraction === 'transfer' && TransferList && TransferList.length > 0 ? 
<div>
<table className="table table-bordered">  
<tr>  
    <th>S.No</th>  
    <th>Cycle No</th>  
    <th>Action</th>  
</tr>  

{TransferList.map((TransferList1, index) => (  
  <tr data-index={index}>  
    <td>{index+1}</td>  
    <td>{TransferList1}</td>  
    <td></td>   
  </tr>  
))}  

</table>  
<button onClick={TransferAll} className="btn btn-primary">Transfer All</button>
</div> 
      :null}
      


      <ToastContainer/>

    </>
  );
};

export default QRCodeBox;
