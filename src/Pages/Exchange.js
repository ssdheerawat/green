import React from 'react';
import QRCodeBox from '../components/QRCodeBox';

const Exchange = (props) => {


  return (
    <>
    <div  style={{ alignItems: 'center', textAlign:'center' }}>
    <h5 className="card-header">Exchange Cycle</h5>


    <QRCodeBox heading={'Scan Old Cycle QR Code'} qrtype={'cycle'} qraction={'exchange_old'} />

    </div>
   

   
 

    </>
  );
};

export default Exchange;
