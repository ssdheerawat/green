import React from 'react';
import QRCodeBox from '../components/QRCodeBox';

const Receive = (props) => {


  return (
    <>
    <div  style={{ alignItems: 'center' }}>
    <h5 className="card-header">Issue Cycle</h5>


    <QRCodeBox heading={'Scan User QR Code'} qrtype={'user'} qraction={'issue'} />

    </div>
   

   
 

    </>
  );
};

export default Receive;
