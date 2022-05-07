import React from 'react';
import QRCodeBox from '../components/QRCodeBox';

const Receive = (props) => {


  return (
    <>
    <div  style={{ alignItems: 'center' }}>
    <h5 className="card-header">Receive Cycle</h5>


    <QRCodeBox heading={'Scan Cycle QR Code Code'} qrtype={'cycle'} qraction={'receive'} />

    </div>
   

   
 

    </>
  );
};

export default Receive;
