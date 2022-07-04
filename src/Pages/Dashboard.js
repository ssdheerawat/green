import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
//import loadingImg from '../assets/img/loader.gif';
import { Modal } from "../components/Modal";


//import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';


function Dashboard() {

	
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();
  

  const [IsloginStand, setIsloginStand] = useState(false);
  const [IsStandOpen, setIsIsStandOpen] = useState(false);
  const [DashboardData, setDashboardData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  //const [StandAccess, setStandAccess] = useState([]);
  
  const getDashboardData = async (qrCode, qrtype, qraction) => {

    const response = await api({
      url: 'staff/dashboarddata',
      methode: "POST",
      data: {"stand_id": "qrCode"},
    });

    console.log("response===", response);
    

    if (response.status) {
		//dfdsfd

		if(response.data.standStatus === 1){
            Cookies.set( "standOpen",  "yes" );
			setIsIsStandOpen(true);
        }
        else {
          Cookies.set( "standOpen",  "no" );
		  setIsIsStandOpen(false);
        }

		Cookies.set( "loginStand",  response.data.loginStand );

		

		setDashboardData(response.data);

		//console.log((response.data.standAccess));
		//setStandAccess(DashboardData.standAccess);
		//console.log("StandAccess",StandAccess);
		
        
        
    }else {
        //setIsQRloading(false);
        toast.error(response.message);
      }
  };

  console.log("DashboardData",DashboardData.standAccess);

  const loginStand = Cookies.get("loginStand");
  //standOpen

  let navigate = useNavigate();

  let token = Cookies.get("token");
	console.log("token=====",token);
	if (!token) {
		navigate("/green", { replace: true });
	}





  useEffect(() => {

	  navigator.geolocation.getCurrentPosition(function(position) {
		console.log("Latitude is :", position.coords.latitude);
		console.log("Longitude is :", position.coords.longitude);
	  },
	  function(error) {
		toast.error(error.message);
        console.error("Error Code = " + error.code + " - " + error.message);
      }
	  );


	

	

	let userDetailStr = Cookies.get("userDetail");
      if(userDetailStr && userDetailStr !=="") {

      }
      else {
        userDetailStr = "{}";
      }
	  let userDetail = JSON.parse(userDetailStr);


	console.log(userDetail);
	

	
	let standOpen = Cookies.get("standOpen");
	let successMsg = Cookies.get("successMsg");

	if(successMsg !== "") {
		toast.success(successMsg);
		Cookies.set(
			"successMsg",
			""
		  );

	}
	console.log("loginStand", loginStand);
	if(loginStand && loginStand !== "") {
		setIsloginStand(true);
	  }

	  if(standOpen && standOpen === "yes") {
		setIsIsStandOpen(true);
	  }

	  getDashboardData();
  }, [ loginStand]);




  const openModal = () => {
    setShowModal(true);
  };
  
//loginStand
  return (
    <div>

<button onClick={openModal}>Open Modal</button>
      {showModal ? <Modal setShowModal={setShowModal} modelHtml="Hello <br/>hi" /> : null}

<div className="card darkcard" >
		<div className="card-header">

		{ IsloginStand ? 
		<div className="row">
			<div className="col-10 col-sm-10">

		   

			
			<h3 className="card-title form-title"><i className="tf-icons bx bx-cycling"></i> {loginStand}</h3>
			

			</div>
			<div className="col-2 col-sm-2 txt-right"><Link to="/green/exchange" title="Exchange Cycle" className="dash-link" ><i className="tf-icons bx bx-repost"></i></Link></div>
		</div>
		:
		null
		}	

		</div>
</div>

		

		 

      <table className="table dash-link-tbl table-bordered ">
			<tbody><tr>
				<td className="disabledClick">
{ 
IsloginStand  && IsStandOpen
?  <Link to="/green/issue" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-cycling"></i></div><div className="card-title">Issue ({DashboardData.issued})</div></Link>
: <Link to="/" className="dash-link disabledCursor" onClick={ (event) => event.preventDefault() } ><div className="card-icon"><i className="tf-icons bx bx-cycling"></i></div><div className="card-title">Issue ({DashboardData.issued})</div></Link>
}
						
				</td>
				<td className="disabledClick">
				{ 
				IsloginStand  && IsStandOpen
				?  <Link to="/green/deposit" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-briefcase"></i></div><div className="card-title">Deposit ({DashboardData.deposit})</div></Link>
				: <Link to="/" className="dash-link disabledCursor" onClick={ (event) => event.preventDefault() } ><div className="card-icon"><i className="tf-icons bx bx-briefcase"></i></div><div className="card-title">Deposit ({DashboardData.deposit})</div></Link>
				}



				</td>
				<td className="disabledClick">
<Link   to={
       {     
         pathname: '/green/onroad',
         status:1
        }
  }
  className="dash-link"
  > 
						
								<div className="card-icon">
									<i className="tf-icons bx bx-trending-up"></i>
								</div>
								<div className="card-title">On Road</div>
						</Link>
				</td>
		
			</tr>
			<tr>
			<td className="disabledClick">
			{ 
			IsloginStand
			?  <Link to="/green/transfer" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-transfer"></i></div><div className="card-title">Transfer ({DashboardData.transfered})</div></Link>
			: <Link to="/" className="dash-link disabledCursor" onClick={ (event) => event.preventDefault() } ><div className="card-icon"><i className="tf-icons bx bx-transfer"></i></div><div className="card-title">Transfer ({DashboardData.transfered})</div></Link>
			}

				</td>
				<td className="disabledClick">

					{ 
					IsloginStand
					?  <Link to="/green/receive" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-download"></i></div><div className="card-title">Receive ({DashboardData.received})</div></Link>
					: <Link to="/" className="dash-link disabledCursor" onClick={ (event) => event.preventDefault() } ><div className="card-icon"><i className="tf-icons bx bx-download"></i></div><div className="card-title">Receive ({DashboardData.received})</div></Link>
					}
					
				</td>
				<td className="disabledClick">

{ 
IsStandOpen && IsloginStand
?  <Link to="/green/stand-inout" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-lock-open"></i></div><div className="card-title">Close Stand</div></Link>
: null
}
{ 
!IsStandOpen && IsloginStand
?  <Link to="/green/stand-inout" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-lock-open"></i></div><div className="card-title">Open Stand</div></Link>
: null
}
{ 
!IsloginStand
?  <Link to="/" className="dash-link disabledCursor" onClick={ (event) => event.preventDefault() }><div className="card-icon"><i className="tf-icons bx bx-lock-open"></i></div><div className="card-title">Stand</div></Link>
: null
}
					
						
				</td>
			
			</tr>
			<tr>
			<td className="disabledClick">
				{ 
				IsloginStand
				?  <Link to="/green/self-atendance" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-user-check"></i></div><div className="card-title">Attendance Out</div></Link>
				: <Link to="/green/self-atendance" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-user-check"></i></div><div className="card-title">Self Attendance</div></Link>
				}
			
				</td>
				<td className="disabledClick">
						<Link to="/green/transaction" className="dash-link">
								<div className="card-icon">
									<i className="tf-icons bx bx-wallet-alt"></i>
								</div>
								<div className="card-title">Transaction</div>
						</Link>
				</td>
				<td className="disabledClick">
						<Link to="/green/app-link" className="dash-link">
								<div className="card-icon">
									<i className="tf-icons bx bx-share-alt"></i>
								</div>
								<div className="card-title">App Link</div>
						</Link>
				</td>
				
			</tr>
			
			</tbody></table>


			{ IsloginStand ? 

			
			<div>

				<table className="table-borderless mb-4" style={{width:"100%"}}>
					<tr>
						<td className="text-center mb-4">
							<Link to="/green/cycles" className="dash-link">
							<button type="button" className="btn btn-primary">
							Cycle List <br/> ({DashboardData.totalCycle})
                            </button>
							</Link>
						</td>
						<td className="text-center">
							
							<button type="button" className="btn btn-primary">
							Event <br/>Issue
                            </button>
							
						</td>
						<td className="text-center">
							
							<button type="button" className="btn btn-primary">
							Event <br/>Receive
                            </button>
							
						</td>
					</tr>

					<tr>
					<td className="text-center">
							<Link to="/green/qr-check" className="dash-link">
							<button type="button" className="btn btn-primary">
							QR <br/>Check
                            </button>
							</Link>
						</td>
						<td className="text-center">
							
							<button type="button" className="btn btn-primary">
							Summary <br/><br/>
                            </button>
							
						</td>
						<td className="text-center">
							
							<button type="button" className="btn btn-primary">
							Cycle<br/>Movement
                            </button>
							
						</td>
					</tr>
				</table>

				<div>
				<div className="card bg-primary text-white icon-card cursor-pointer text-center mb-4 mx-2 staffDutyList">
				<div className="card-header">Staff On this stand </div>
			
                  <div className="card-body">
				  <div className="table-responsive text-nowrap">

					  
						  { typeof DashboardData.otherStaff !== 'undefined' ? 
							  
									DashboardData.otherStaff.map((item, index) => {
									return (
								
										<div key={index} style={{textColor:'#fff', alignItems:'center', textAlign:'center', display:'inline-block', paddingLeft:15, paddingRight:15  }}>
											<div className="">
											<img src={item.profile_photo} alt="..." className="w-px-40 h-auto rounded-circle" />
											</div> {item.fullname} </div>
								
									)
									})
							
                              : null }
							  
						
					  </div>
                   
                  </div>
				  
                </div>
				</div>



				</div>
				:
				null
				}


			{ (DashboardData?.role_id === 1 || DashboardData?.role_id === 2 || DashboardData?.role_id === 3) &&
			
			
			<div className="card">
				<div className="card-body">
					<div className="row">
						<div className="col-6 col-sm-6">
							<Link to="/green/stands" className="dash-link">
							<button type="button" className="btn btn-primary">
                              <span className="tf-icons bx bx-pie-chart-alt"></span>&nbsp; Stand Status
                            </button>
							</Link>
							</div>
						<div className="col-6 col-sm-6">
						<Link to="/green/staff" className="dash-link">
							<button type="button" className="btn btn-primary">
                              <span className="tf-icons bx bx-pie-chart-alt"></span>&nbsp; Staff OnDuty
                            </button>
							</Link>
							</div>
					</div>
				</div>
			</div>
			}




			
			<ToastContainer/>
    </div>
  );
}

export default Dashboard;
