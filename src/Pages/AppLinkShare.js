import React, {useState} from 'react';


const AppLinkShare = (props) => {

  const [IsActiveScreen, setIsActiveScreen] = useState('android');
  const [CopyURL, setCopyURL] = useState('');


  const setActivsScreen = (screen) => {

    setIsActiveScreen(screen);

    console.log("screen===",screen);

  }

  async function onShare() {
    const title = "GreenRide APP";
    const url = 'https://play.google.com/store/apps/details?id=in.greenride.greenride';
    const text = "Learn how to use the share api";
    try {
        await navigator
        .share({
          title,
          url,
          text
        })
        
          /*
            Show a message if the user shares something
          */
          alert(`Thanks for Sharing!`);
      } catch (err) {
         /*
            This error will appear if the user cancels the action of sharing.
          */
         alert(`Couldn't share ${err}`);
      }
  }

  function copyToClipboard(e) {

    
    setCopyURL('Copied!');
  };


  return (
    <>
    <div className={IsActiveScreen}>

    <table style={{width:'100%'}}>
        <tr>
          <td colSpan={3} style={{textAlign:'center'}}>
          {IsActiveScreen === 'android' ?
              <img src="assets/img/android.png" alt="..." style={{width:100, height:100}} />

              : 
              <img src="assets/img/ios.png" alt="..." style={{width:100, height:100}} />
              }
          </td>
        </tr>

        <tr>
          <td colSpan={3} style={{textAlign:'center'}}>
          <img src="assets/img/GreenRideAPP.png" alt="..." style={{width:180}} />
          </td>
        </tr>
        <tr>
          <td style={{textAlign:'center'}}><button onClick={()=>onShare()} ><i className="tf-icons bx bx-share-alt"></i></button></td>
          <td style={{textAlign:'center'}}><button onClick={()=>copyToClipboard()} ><i className="tf-icons bx bx-phone"></i></button></td>
          <td style={{textAlign:'center'}}><button onClick={()=>copyToClipboard()} ><i className="tf-icons bx bx-copy"></i></button>{CopyURL}</td>
        </tr>
      </table>

    
    

    

   

    
    

    
   

    
    
     

   



      

      <div style={{bottom: 0,position: 'absolute', width:'100%'}}>
        <table style={{width:'100%'}}>
          <tr>
            <td style={{width:'50%', textAlign:'center'}}><img onClick={()=>setActivsScreen('android')} src="assets/img/app-android.png" alt="..." style={{height: 65}} /></td>
            <td style={{width:'50%', textAlign:'center'}}><img onClick={()=>setActivsScreen('ios')} src="assets/img/app-ios.png" alt="..." style={{height: 70}} /></td>
          </tr>
        </table>
      
      

      </div>
   


   

    </div>
   

   
 

    </>
  );
};

export default AppLinkShare;
