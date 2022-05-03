import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { QrReader } from 'react-qr-reader';


function SelfAtendance() {
    const [data, setData] = useState('No result');
    //const [selected, setSelected] = useState("environment");

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();

  return (
    <div>
        <QrReader
        facingMode={'environment'}
        delay={500}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "200px", heigth: "100px" }}
      />
      <p>{data}</p>
		
   
    </div>
  );
}

export default SelfAtendance;
