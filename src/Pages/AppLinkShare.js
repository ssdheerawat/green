import React, {useState} from 'react';


const AppLinkShare = (props) => {

  const [IsActiveScreen, setIsActiveScreen] = useState('android');
  //const [CopyURL, setCopyURL] = useState('');


  const setActivsScreen = (screen) => {

    setIsActiveScreen(screen);

    console.log("screen===",screen);

  }

  async function onShare() {
    const title = "MyBicycles APP";
    const url = 'https://play.google.com/store/apps/details?id=com.MyBicycles';
    const text = "MyBicycles Public Bicycle Sharing Service";
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

    var textField = document.createElement('textarea')
  textField.innerText = 'https://play.google.com/store/apps/details?id=com.MyBicycles'
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()

    
  alert('Copied!');
  };


  return (
    <>
    <div className={IsActiveScreen}>

    <table style={{width:'100%'}}>
        <tr>
          <td colSpan={3} style={{textAlign:'center'}}>
          {IsActiveScreen === 'android' ?
              <img src="assets/img/android.png" alt="..." style={{width:100, height:100, margin:15}} />

              : 
              <img src="assets/img/ios.png" alt="..." style={{width:100, height:100, margin:25}} />
              }
          </td>
        </tr>

        <tr>
          <td colSpan={3} style={{textAlign:'center'}}>
          <img src="assets/img/GreenRideAPP.png" alt="..." style={{width:180, marginBottom:25}} />
          </td>
        </tr>
        <tr>
          <td style={{textAlign:'center'}}><button className='btn btn-icon btn-outline-primary' onClick={()=>onShare()} ><i className="tf-icons bx bx-share-alt"></i></button></td>
          <td style={{textAlign:'center'}}><a className='btn btn-icon btn-outline-primary' href="tel:+919312237612"> <i className="tf-icons bx bx-phone"></i> </a></td>
          <td style={{textAlign:'center'}}><button className='btn btn-icon btn-outline-primary' onClick={()=>copyToClipboard()} ><i className="tf-icons bx bx-copy"></i></button></td>
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
