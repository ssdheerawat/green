import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
//import loadingImg from '../assets/img/loader.gif';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function Dashboard() {

	
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();
  

  const [IsloginStand, setIsloginStand] = useState(false);
  const [IsStandOpen, setIsIsStandOpen] = useState(false);
  const [DashboardData, setDashboardData] = useState([]);
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



  const SelfAtendanceAPI = async (newStandId) => {
    const response = await api({
      url: "staff/change-stand",
      methode: "POST",
      data: {"stand_id": newStandId},
    });

    console.log("response===", response);

    if (response.status) {

        Cookies.set(
			"loginStand",
			response.data.title
		  );
		  Cookies.set(
			"loginStandId",
			newStandId
		  );

        Cookies.set(
          "successMsg",
          response.message
        );
        navigate("/dashboard", { replace: true });
    }else {
        
        toast.error(response.message);
        // alert("Something went wrong");
      }
  };
  function onValueChange(newStandId) {

	SelfAtendanceAPI(newStandId);

		console.log(newStandId);

  }

  
//loginStand
  return (
    <div>



<div className="card darkcard" >
		<div className="card-header">

		{ IsloginStand ? 
		<div className="row">
			<div className="col-10 col-sm-10">

		   

			{ (DashboardData?.role_id === 1 || DashboardData?.role_id === 2 || DashboardData?.role_id === 3) ?

			<Popup trigger={<h3 className="card-title form-title"><i className="tf-icons bx bx-cycling"></i> {loginStand}</h3>} modal ={true}>
			<div>
			<ul>
			{Object.keys(DashboardData.standAccess).map((key) => (
				<li key={key}>
					<div className="form-check">
					<input className="form-check-input" type="radio" id={"newStand"+ key} name="newStand" value={key} onChange={()=>onValueChange(key)} />
					<label className="form-check-label" htmlFor={"newStand"+ key}>
						{DashboardData.standAccess[key]}
					</label>
					</div>
					</li>
				))}
			</ul>
			</div>
		  	</Popup>
			:
			<h3 className="card-title form-title"><i className="tf-icons bx bx-cycling"></i> {loginStand}</h3>
			}

			</div>
			<div className="col-2 col-sm-2 txt-right"><Link to="/exchange" title="Exchange Cycle" className="dash-link" ><i className="tf-icons bx bx-repost"></i></Link></div>
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
?  <Link to="/issue" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-cycling"></i></div><div className="card-title">Issue ({DashboardData.issued})</div></Link>
: <Link to="/" className="dash-link disabledCursor" onClick={ (event) => event.preventDefault() } ><div className="card-icon"><i className="tf-icons bx bx-cycling"></i></div><div className="card-title">Issue ({DashboardData.issued})</div></Link>
}
						
				</td>
				<td className="disabledClick">
				{ 
				IsloginStand  && IsStandOpen
				?  <Link to="/deposit" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-briefcase"></i></div><div className="card-title">Deposit ({DashboardData.deposit})</div></Link>
				: <Link to="/" className="dash-link disabledCursor" onClick={ (event) => event.preventDefault() } ><div className="card-icon"><i className="tf-icons bx bx-briefcase"></i></div><div className="card-title">Deposit ({DashboardData.deposit})</div></Link>
				}



				</td>
				<td className="disabledClick">
<Link   to={
       {     
         pathname: '/onroad',
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
			?  <Link to="/transfer" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-transfer"></i></div><div className="card-title">Transfer ({DashboardData.transfered})</div></Link>
			: <Link to="/" className="dash-link disabledCursor" onClick={ (event) => event.preventDefault() } ><div className="card-icon"><i className="tf-icons bx bx-transfer"></i></div><div className="card-title">Transfer ({DashboardData.transfered})</div></Link>
			}

				</td>
				<td className="disabledClick">

					{ 
					IsloginStand
					?  <Link to="/receive" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-download"></i></div><div className="card-title">Receive ({DashboardData.received})</div></Link>
					: <Link to="/" className="dash-link disabledCursor" onClick={ (event) => event.preventDefault() } ><div className="card-icon"><i className="tf-icons bx bx-download"></i></div><div className="card-title">Receive ({DashboardData.received})</div></Link>
					}
					
				</td>
				<td className="disabledClick">

{ 
IsStandOpen && IsloginStand
?  <Link to="/stand-inout" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-lock-open"></i></div><div className="card-title">Close Stand</div></Link>
: null
}
{ 
!IsStandOpen && IsloginStand
?  <Link to="/stand-inout" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-lock-open"></i></div><div className="card-title">Open Stand</div></Link>
: null
}
{ 
!IsloginStand
?  <Link to="/" className="dash-link disabledCursor" onClick={ (event) => event.preventDefault() }><div className="card-icon"><i className="tf-icons bx bx-lock-open"></i></div><div className="card-title">Open Stand</div></Link>
: null
}
					
						
				</td>
			
			</tr>
			<tr>
			<td className="disabledClick">
				{ 
				IsloginStand
				?  <Link to="/self-atendance" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-user-check"></i></div><div className="card-title">Attendance Out</div></Link>
				: <Link to="/self-atendance" className="dash-link" ><div className="card-icon"><i className="tf-icons bx bx-user-check"></i></div><div className="card-title">Self Attendance</div></Link>
				}
			
				</td>
				<td className="disabledClick">
						<Link to="/transaction" className="dash-link">
								<div className="card-icon">
									<i className="tf-icons bx bx-wallet-alt"></i>
								</div>
								<div className="card-title">Transaction</div>
						</Link>
				</td>
				<td className="disabledClick">
						<Link to="/app-link" className="dash-link">
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
			<div className="d-flex flex-wrap dashcard" id="icons-container">
                <div className="card bg-primary text-white icon-card cursor-pointer text-center mb-4 mx-2">
				<Link   to={{pathname: '/cycles',status:1}} > 
                  <div className="card-body">
                    <i className="bx bxl-adobe mb-2"></i>
                    <p className="icon-name text-capitalize text-truncate mb-0">Total Cycle</p>
                    <p className="icon-name text-capitalize text-truncate mb-0">{DashboardData.totalCycle}</p>
                  </div>
				  </Link>
                </div>
                <div className="card bg-primary text-white icon-card cursor-pointer text-center mb-4 mx-2">
				<Link   to={{pathname: '/cycles',status:1}} > 
                  <div className="card-body">
                    <i className="bx bxl-algolia mb-2"></i>
                    <p className="icon-name text-capitalize text-truncate mb-0">On Road</p>
                    <p className="icon-name text-capitalize text-truncate mb-0">{DashboardData.totalOnroad}</p>
                  </div>
				  </Link>
                </div>
                <div className="card bg-primary text-white icon-card cursor-pointer text-center mb-4 mx-2">
				<Link   to={{pathname: '/cycles',status:1}} > 
                  <div className="card-body">
                    <i className="bx bxl-audible mb-2"></i>
                    <p className="icon-name text-capitalize text-truncate mb-0">Stock</p>
                    <p className="icon-name text-capitalize text-truncate mb-0">{DashboardData.totalStock}</p>
                  </div>
				  </Link>
                </div>
				</div>


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
							<Link to="/stands" className="dash-link">
							<button type="button" className="btn btn-primary">
                              <span className="tf-icons bx bx-pie-chart-alt"></span>&nbsp; Stand Status
                            </button>
							</Link>
							</div>
						<div className="col-6 col-sm-6">
						<Link to="/staff" className="dash-link">
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
