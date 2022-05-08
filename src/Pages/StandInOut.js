import React from 'react';
import QRCodeBox from '../components/QRCodeBox';

const StandInOut = (props) => {


  return (
    <>
    <div  style={{ alignItems: 'center', textAlign:'center' }}>
    <h5 className="card-header">Stand Open</h5>


    <QRCodeBox heading={'Scan Stand QR Code'} qrtype={'stand'} qraction={'inout'} />

    </div>
   

   
 

    </>
  );
};

export default StandInOut;
