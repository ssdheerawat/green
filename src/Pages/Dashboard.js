import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
//import loadingImg from '../assets/img/loader.gif';


function Dashboard() {

	
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();
  

  const [IsloginStand, setIsloginStand] = useState(false);
  const [IsStandOpen, setIsIsStandOpen] = useState(false);
  const [DashboardData, setDashboardData] = useState([]);

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
		//console.log("DashboardData",DashboardData);
        
        
    }else {
        //setIsQRloading(false);
        toast.error(response.message);
      }
  };

  const loginStand = Cookies.get("loginStand");
  //standOpen

  let navigate = useNavigate();

  let token = Cookies.get("token");
console.log("token=====",token);
if (!token) {
	navigate("/green", { replace: true });
}





  useEffect(() => {


	

	

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

  
//loginStand
  return (
    <div>

	

		

		{ IsloginStand ? 
		<div className="card darkcard" >
		<div className="card-header">
		<h3 className="card-title form-title"><i className="tf-icons bx bx-cycling"></i> {loginStand}</h3>
		</div>
		</div>
		:
		null
		}	
               

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
?  <Link to="/" className="dash-link disabledCursor" onClick={ (event) => event.preventDefault() }><div className="card-icon"><i className="tf-icons bx bx-lock-open"></i></div><div className="card-title">Open Stand</div></Link>
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
			<div className="d-flex flex-wrap dashcard" id="icons-container">
                <div className="card bg-primary text-white icon-card cursor-pointer text-center mb-4 mx-2">
				<Link   to={{pathname: '/green/cycles',status:1}} > 
                  <div className="card-body">
                    <i className="bx bxl-adobe mb-2"></i>
                    <p className="icon-name text-capitalize text-truncate mb-0">Total Cycle</p>
                    <p className="icon-name text-capitalize text-truncate mb-0">{DashboardData.totalCycle}</p>
                  </div>
				  </Link>
                </div>
                <div className="card bg-primary text-white icon-card cursor-pointer text-center mb-4 mx-2">
				<Link   to={{pathname: '/green/cycles',status:1}} > 
                  <div className="card-body">
                    <i className="bx bxl-algolia mb-2"></i>
                    <p className="icon-name text-capitalize text-truncate mb-0">On Road</p>
                    <p className="icon-name text-capitalize text-truncate mb-0">{DashboardData.totalOnroad}</p>
                  </div>
				  </Link>
                </div>
                <div className="card bg-primary text-white icon-card cursor-pointer text-center mb-4 mx-2">
				<Link   to={{pathname: '/green/cycles',status:1}} > 
                  <div className="card-body">
                    <i className="bx bxl-audible mb-2"></i>
                    <p className="icon-name text-capitalize text-truncate mb-0">Stock</p>
                    <p className="icon-name text-capitalize text-truncate mb-0">{DashboardData.totalStock}</p>
                  </div>
				  </Link>
                </div>
				</div>


				<div>
				<div className="card bg-primary text-white icon-card cursor-pointer text-center mb-4 mx-2">
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




			
			<ToastContainer/>
    </div>
  );
}

export default Dashboard;
