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

<div class="card darkcard"><div class="card-header"><i class="tf-icons bx bx-cycling"></i> Transactions  </div></div>

<div className="table-responsive text-nowrap">
                  <table className="table table-bordered">
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
                              <tbody className="table-border-bottom-0">
                              {
                                Transactions.map((item, index) => {
                                  return (
                             
                                      <tr key={index}>
                                        <td> {index+1} </td>
                                        <td> {item.cycle_id} </td>
                                        <td> {item?.user?.fullname} </td>
                                        <td> {item?.stand_from_data?.title} </td>
                                        <td> <Moment date={item.DateFrom} format="DD/MM/YYYY hh:mm A" /></td>
                                        <td> {item.TotalMinute} M</td>
                                        <td> Rs. {item.FareDeducted} </td>
                                        
                                      </tr>
                             
                                  )
                                })
                              }

                            </tbody>
                          </table>
                          </div>


	
               









			<ToastContainer/>
    </div>
  );
}

export default TransactionList;
