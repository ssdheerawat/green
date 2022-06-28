import React, {useState, useEffect} from "react";
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../api";


function TransactionList(props) {

    console.log("props",props);
	
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();
  


  const [Transactions, setTransactions] = useState([]);
  const [IsLoad, setIsLoad] = useState(false);

  const getCycleListData = async () => {

    const response = await api({
      url: 'staff/rides',
      methode: "POST",
      data: {"status": "1"},
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



	  getCycleListData();
  }, []);

  
//loginStand
  return (
    <div>

<div className="card darkcard"><div className="card-header"><h3 className="card-title form-title"><i className="tf-icons bx bx-cycling"></i> Transactions</h3>  </div></div>

<div className="table-responsive text-nowrap">
                  <table className="table table-bordered standsList">
                    <thead className="table-dark">
                              <tr>
                                <th>S.No</th>
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
                                Transactions.map((item, index) => {
                                  return (
                             
                                      <tr key={index} className={"status" + item.status}>
                                        <td> {index+1} </td>
                                        <td> {item.cycle_id} </td>
                                        <td> {item?.user?.fullname} </td>
                                        <td> {item?.stand_from_data?.title} </td>
                                        <td> <Moment date={item.DateFrom} format="DD/MM/YYYY hh:mm A" /></td>
                                        <td>{item.status ===1 ? item.TotalMinute + " M" : '--'}</td>
                                        <td>{item.status ===1 ? "Rs."+ item.FareDeducted : '--'}</td>
                                        
                                      </tr>
                             
                                  )
                                })
                              }

                            {
                                Transactions.length === 0 && 
                                <tr><td className="text-center" colSpan={7}>No Record Found!</td></tr>
                              }

                            </tbody>
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
