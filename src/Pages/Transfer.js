import React from 'react';
import QRCodeBox from '../components/QRCodeBox';

const Transfer = (props) => {


  return (
    <>
    <div  style={{ alignItems: 'center' }}>
    <h5 className="card-header">Transfer Cycle</h5>


    <QRCodeBox heading={'Scan Cycle QR Code'} qrtype={'cycle'} qraction={'transfer'} />

    </div>
   

   
 

    </>
  );
};

export default Transfer;
