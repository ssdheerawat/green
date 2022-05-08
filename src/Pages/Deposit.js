import React from 'react';
import QRCodeBox from '../components/QRCodeBox';

const Deposit = (props) => {


  return (
    <>
    <div  style={{ alignItems: 'center', textAlign:'center' }}>
    <h5 className="card-header">Deposit Cycle</h5>


    <QRCodeBox heading={'Scan Cycle QR Code'} qrtype={'cycle'} qraction={'deposit'} />

    </div>
   

   
 

    </>
  );
};

export default Deposit;
