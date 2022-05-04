import React, { useState, useRef  } from 'react';
import { QrReader } from 'react-qr-reader';
import { useTorchLight } from '@blackbox-vision/use-torch-light';

const SelfAtendance = (props) => {

    
    const streamRef = useRef(null);
  const [data, setData] = useState('No result');
  const [on, toggle] = useTorchLight(streamRef.current);



  return (
    <>
    <div  style={{ alignItems: 'center' }}>
    <h5 className="card-header">Staff Attendance</h5>
    <h6 className="card-subheader">Scan Stand QR Code</h6>
    <div className='card1' style={{width:250, height:250, align:'center', margin:'auto'}}>
      <QrReader
       constraints={{
        facingMode: 'environment'
    }}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      </div>

      <i className="tf-icons bx bx-torch"></i>
      

      <button onClick={toggle}>{on ? 'Disable Torch' : 'Enable Torch'}</button>
      </div>
      <p>{data}</p>

    </>
  );
};

export default SelfAtendance;
