import React from 'react';
import QRCodeBox from '../components/QRCodeBox';

const ExchangeAPI = (props) => {


  return (
    <>
    <div  style={{ alignItems: 'center', textAlign:'center' }}>
    <h5 className="card-header">Exchange Cycle</h5>


    <QRCodeBox heading={'Scan New Cycle QR Code'} qrtype={'cycle'} qraction={'exchange_new'} />

    </div>
   

   
 

    </>
  );
};

export default ExchangeAPI;
