import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { QrReader } from 'react-qr-reader';





function SelfAtendance() {
    //const [data, setData] = useState('No result');

    const [code, setCode] = useState(null);
  const [showDialog, setDiaglog] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [selected, setSelected] = useState("rear");
  const [errorMessage, setErrorMessage] = useState(null);


 

  const handleScan = async (scanData) => {
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "" && !showDialog && !processing) {
      console.log(`loaded >>>`, scanData);
      
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

    //const [selected, setSelected] = useState("environment");

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();

  return (
    <div>
        

        <h1>Hello CodeSandbox</h1>
      <h2>
        
        {selected}
      </h2>
      <select onChange={(e) => setSelected(e.target.value)}>
        <option value={"environment"}>Back Camera</option>
        <option value={"user"}>Front Camera</option>rear
        <option value={"rear"}>rear Camera</option>
      </select>
      {showDialog && (
        <div className="dialog">
          <div className="dialog-content">
            <div className="close">
              <button
                onClick={() => {
                  setCode(null);
                  setErrorMessage(null);
                  setDiaglog(false);
                  setProcessing(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {errorMessage && (
              <div className="errorMessage">
                <h2>{errorMessage}</h2>
              </div>
            )}
            {code && (
              <div className="description">
                <h4 className="title">Scan Result</h4>
                <div className="detail detail-first-child">
                  <h6 className="detail-header">Matricule :</h6>
                  <h6 className="detail-content green">{code.text}</h6>
                </div>
                <div className="detail">
                  <h6 className="detail-header">Identité :</h6>
                  <h6 className="detail-content">{code.identite}</h6>
                </div>
                <div className="detail">
                  <h6 className="detail-header">Pomotion :</h6>
                  <h6 className="detail-content">{code.promotion}</h6>
                </div>
                <div className="detail">
                  <h6 className="detail-header">Année Academique :</h6>
                  <h6 className="detail-content">{code.annee}</h6>
                </div>
                <div className="detail">
                  <h6 className="detail-header">Total payé :</h6>
                  <h6 className="detail-content red">
                    {code.frais} (USD,dollars americains)
                  </h6>
                </div>
                <div className="detail">
                  <h6 className="detail-header">Total prévu :</h6>
                  <h6 className="detail-content red">
                    {code.total} (USD,dollars americains)
                  </h6>
                </div>
                <div className="detail">
                  <h6 className="detail-header">Reste à payer :</h6>
                  <h6 className="detail-content red">
                    {code.total - code.frais} (USD,dollars americains)
                  </h6>
                </div>
                <div className="detail">
                  <h6 className="detail-header">Votre Situation :</h6>
                  <h6
                    className={
                      code.total <= code.frais
                        ? `detail-content green`
                        : "detail-content red small"
                    }
                  >
                    {code.total <= code.frais
                      ? "Eligible"
                      : "Vous etes en retard de payement"}
                  </h6>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* {code && <h2>{code.text}</h2>} */}
      {!showDialog && !processing && (
        <QrReader
          facingMode={selected}
          delay={500}
          onError={handleError}
          onScan={handleScan}
          // chooseDeviceId={()=>selected}
          style={{ width: "200px", heigth: "100px" }}
        />
      )}
		
   
    </div>
  );
}

export default SelfAtendance;
