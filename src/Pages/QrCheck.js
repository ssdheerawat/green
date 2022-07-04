import React from 'react';
import QRCodeBox from '../components/QRCodeBox';

const QrCheck = (props) => {


  return (
    <>
    <div  style={{ alignItems: 'center', textAlign:'center' }}>
    <h5 className="card-header">QR Check</h5>


    <QRCodeBox heading={'QR Check'} qrtype={'qr'} qraction={'qrCheck'} />

    </div>
   

   
 

    </>
  );
};

export default QrCheck;
