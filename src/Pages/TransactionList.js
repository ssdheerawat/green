import React, {useState, useEffect} from "react";
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../api";
import Cookies from "js-cookie";
//import Select from "react-dropdown-select";
//standAccess



function TransactionList(props) {

    console.log("props",props);
	
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();
  

  let loginStandId = Cookies.get("loginStandId");
  const [Transactions, setTransactions] = useState([]);
  const [IsLoad, setIsLoad] = useState(false);
  const [standId, setValues] = useState(loginStandId);

  let standAccess = JSON.parse( Cookies.get("userDetail")).standAccess;


  

  console.log(standAccess);
  
  const getCycleListData = async (standId) => {

    const response = await api({
      url: 'staff/rides',
      methode: "POST",
      data: {"status": "1", "standId":standId},
    });

    console.log("response===", response);
    

    if (response.status) {
		//dfdsfd

		setTransactions(response.data);
    setIsLoad(true);
		//console.log("DashboardData",DashboardData);
        
        
    }else {
        //setIsQRloading(false);
        toast.error(response.message);
      }
  };
  //standOpen
  useEffect(() => {
    setIsLoad(false);
	  getCycleListData(standId);
  }, [standId]);



  useEffect(() => {

    //let loginStandId = Cookies.get("loginStandId");
    setValues(loginStandId);

    console.log("loginStandId",loginStandId);

  }, [loginStandId]);

  console.log(standId);


//loginStand

  return (
    <div>

<div className="card darkcard"><div className="card-header"><h3 className="card-title form-title"><i className="tf-icons bx bx-cycling"></i> Transactions</h3>  </div></div>
<div>


<select onChange={(e) => setValues(e.target.value || null)} value={standId} className="form-control">
        {Object.keys(standAccess).map((key) => (
				  <option value={key} key={key}>{standAccess[key]}</option>
				))}
      </select>
</div>
<div className="table-responsive text-nowrap">
                  <table className="table table-bordered standsList">
                    <thead className="table-dark">
                              <tr>
                                <th>Cycle No.</th>
                                <th>Customer</th>
                                <th>Stand</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Fare</th>
                                
                              </tr>
                              </thead>
                              { IsLoad &&
                              <tbody className="table-border-bottom-0">
                              {
                                Transactions.rows.map((item, index) => {

                                  
                               
                                  
                                  return (
                             
                                      <tr key={index} className={"status_" + item.type}>
                                        <td> {item.cycle_id} </td>
                                        <td> {item?.user?.fullname} </td>
                                        <td> {item?.stand_from_data?.short_title} </td>
                                        <td> <Moment date={item.DateFrom} format="DD/MM/YYYY hh:mm A" /></td>
                                        <td>{item.status ===1 ? item.TotalMinute + " M" : '--'}</td>
                                        <td>{item.status ===1 ? "Rs."+ item.FareDeducted : '--'}</td>
                                        
                                      </tr>
                             
                                  )
                                })
                              }

                             {
                                Transactions.rows.length === 0 && 
                                <tr><td className="text-center" colSpan={6}>No Record Found!</td></tr>
                              }

                            </tbody>

                            

                            }

{IsLoad &&
                            <tfoot style={{backgroundColor:'#17a2b83d'}}>
                              <tr>
                                <td colSpan={2}>Issue: {Transactions.IssueCycles}</td>
                                <td colSpan={2}>Deposit: {Transactions.DepositCycles}</td>
                                <td colSpan={2}>Same Stand: {Transactions.SameStand}</td>
                              </tr>
                            </tfoot>
}


                          </table>
                          </div>

                          {!IsLoad &&

                          <div className="text-center"><img  src="assets/img/bicycle.gif" alt="Loading...." style={{width: '100%',
                          maxWidth: '300px'}} /></div>
                          }


	
               









			<ToastContainer/>
    </div>
  );
}

export default TransactionList;
