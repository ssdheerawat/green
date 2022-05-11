import React, {useState} from 'react';


const AppLinkShare = (props) => {

  const [IsActiveScreen, setIsActiveScreen] = useState('android');


  const setActivsScreen = (screen) => {

    setIsActiveScreen(screen);

    console.log("screen===",screen);

  }


  return (
    <>
    <div className={IsActiveScreen}>


      

      <div style={{bottom: 0,position: 'absolute', width:'100%'}}>
        <button onClick={()=>setActivsScreen('android')} className="btn btn-primary" style={{ width:'50%'}}>Android</button>
        <button onClick={()=>setActivsScreen('ios')} className="btn btn-primary" style={{ width:'50%'}}>IOS</button>
      </div>
   


   

    </div>
   

   
 

    </>
  );
};

export default AppLinkShare;
