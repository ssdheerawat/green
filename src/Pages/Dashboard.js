import React from "react";
import { Link } from "react-router-dom";


function Dashboard() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();

  return (
    <div>
		
      <table className="table dash-link-tbl table-bordered ">
			<tbody><tr>
				<td className="disabledClick">
						<Link to="/issue" className="dash-link">
								<div className="card-icon">
									<i className="tf-icons bx bx-cycling"></i>
								</div>
								<div className="card-title">Issue</div>
						</Link>
				</td>
				<td className="disabledClick">
						<Link to="/deposit" className="dash-link">
								<div className="card-icon">
									<i className="tf-icons bx bx-briefcase"></i>
									</div>
								<div className="card-title">Deposit</div>
						</Link>
				</td>
				<td className="disabledClick">
						<Link to="/onroad" className="dash-link">
								<div className="card-icon">
									<i className="tf-icons bx bx-trending-up"></i>
								</div>
								<div className="card-title">On Road</div>
						</Link>
				</td>
		
			</tr>
			<tr>
			<td className="disabledClick">
						<Link to="/transfer" className="dash-link">
								<div className="card-icon">
									<i className="tf-icons bx bx-transfer"></i>
								</div>
								<div className="card-title">Transfer</div>
						</Link>
				</td>
				<td className="disabledClick">
						<Link to="/receive" className="dash-link">
								<div className="card-icon">
									<i className="tf-icons bx bx-download"></i>
								</div>
								<div className="card-title">Receive</div>
						</Link>
				</td>
				<td className="disabledClick">
						<Link to="/open-stand" className="dash-link">
								<div className="card-icon">
									<i className="tf-icons bx bx-lock-open"></i>
								</div>
								<div className="card-title">Open Stand 3</div>
						</Link>
				</td>
			
			</tr>
			<tr>
			<td className="disabledClick">
						<Link to="/self-atendance" className="dash-link">
								<div className="card-icon">
									<i className="tf-icons bx bx-user-check"></i>
								</div>
								<div className="card-title">Self Attendance</div>
						</Link>
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
    </div>
  );
}

export default Dashboard;
