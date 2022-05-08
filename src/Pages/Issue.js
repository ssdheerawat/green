import React from 'react';
import QRCodeBox from '../components/QRCodeBox';

const Issue = (props) => {


  return (
    <>
    <div  style={{ alignItems: 'center', textAlign:'center' }}>
    <h5 className="card-header">Issue Cycle</h5>


    <QRCodeBox heading={'Scan Cycle QR Code'} qrtype={'cycle'} qraction={'issue'} />

    </div>
   

   
 

    </>
  );
};

export default Issue;
