import React from 'react';
import QRCodeBox from '../components/QRCodeBox';

const SelfAtendance = (props) => {


  return (
    <>
    <div  style={{ alignItems: 'center' }}>
    <h5 className="card-header">Staff Attendance</h5>


    <QRCodeBox heading={'Scan Stand QR Code'} qrtype={'stand'} qraction={'open'} />

    </div>
   

   
 

    </>
  );
};

export default SelfAtendance;
