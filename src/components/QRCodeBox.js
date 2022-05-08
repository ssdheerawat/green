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
  const [IsQRloading, setIsQRloading] = useState(false);
  const [TransferList, setTransferList] = useState([]);




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

        Cookies.set(
          "successMsg",
          response.message
        );

        

            
        toast.success(response.message);
        navigate("/dashboard", { replace: true });
    }else {
  
        toast.error(response.message);
        // alert("Something went wrong");
      }
  };

  const StandOpenAPI = async (qrCode, qrtype, qraction) => {



    const response = await api({
      url: 'staff/stand-inout',
      methode: "POST",
      data: {"stand_id": qrCode},
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
        navigate("/dashboard", { replace: true });
    }else {
        setIsQRloading(false);
        toast.error(response.message);
      }
  };

  const IssueCycle = async (qrCode, qrtype, qraction) => {

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
        navigate("/dashboard", { replace: true });
    }else {


        Cookies.set(
          "errorMsg",
          response.message
        );


        toast.error(response.message);

        // alert("Something went wrong");
        navigate("/issue", { replace: true });
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

       Cookies.set(
        "successMsg",
        response.message
      );
      

        toast.success(response.message);
        navigate("/dashboard", { replace: true });
    }else {

        toast.error(response.message);
      }
  };

  const TransferCycleAPI = async (qrCode, qrtype, qraction) => {



    const response = await api({
      url: 'staff/transfer',
      methode: "POST",
      data: {"cycle_id": qrCode,
      "latitude":"4234","longitude":"34234324"},
    });

    console.log("response===", response);
    setIsQRloading(false);

    if (response.status) {

     
        let TransferListArr = TransferList;
        TransferListArr.push(response.data.cycle_no);
        setTransferList(TransferListArr);
        console.log("TransferList==",TransferList);
        //cycle_no

        toast.success(response.message);
        //navigate("/dashboard", { replace: true });
    }else {

        toast.error(response.message);
      }
  };

  const ReceiveCycleAPI = async (qrCode, qrtype, qraction) => {



    const response = await api({
      url: 'staff/receive',
      methode: "POST",
      data: {"cycle_id": qrCode},
    });

    console.log("response===", response);
    setIsQRloading(false);

    if (response.status) {

        toast.success(response.message);
        //navigate("/dashboard", { replace: true });
    }else {

        toast.error(response.message);
      }
  };

  


  if(qrtype === 'stand') {
    //SelfAtendanceAPI('c3RhbmRfNQ==', qrtype, qraction );
    //StandOpenAPI('c3RhbmRfNQ==', qrtype, qraction );
  }
  if(qrtype === 'cycle') {
    

    if(qraction === 'issue') {
      //IssueCycle('MTAwMg==', qrtype, qraction );
    }
    else if(qraction === 'deposit') {
      //DepositCycleAPI('MTAwMg==', qrtype, qraction );
    }
    else if(qraction === 'transfer') {
      //TransferCycleAPI('MTAwMg==', qrtype, qraction );
    }
    else if(qraction === 'receive') {
      //ReceiveCycleAPI('MTAwMg==', qrtype, qraction );
    }
    
    //
  }
  if(qrtype === 'user') {
    //IssueCycleAPI('dXNlcl8x', qrtype, qraction ); //user_1
  }



  
   


  useEffect(() => {

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
    <div  style={{ alignItems: 'center' }}>
    <h6 className="card-subheader">{heading}</h6>
    <div className='card1' style={{width:300, height:250, align:'center', margin:'auto'}}>

    

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
         if(qrtype === 'stand' && qraction==="open") {
           SelfAtendanceAPI(result?.text, qrtype, qraction );
         }
         else if(qrtype === 'stand' && qraction==="inout" ) {
          StandOpenAPI(result?.text, qrtype, qraction );
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
         else if(qrtype === 'cycle' && qraction === 'transfer') {
           TransferCycleAPI(result?.text,  qrtype, qraction );
         }
         else if(qrtype === 'cycle' && qraction === 'receive') {
          ReceiveCycleAPI(result?.text,  qrtype, qraction );
        }
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
      
      :null}
      


      <ToastContainer/>

    </>
  );
};

export default QRCodeBox;
