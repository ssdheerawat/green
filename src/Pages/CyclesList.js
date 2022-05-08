import React, {useState, useEffect} from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../api";


function CyclesList(props) {

    console.log("props",props);
	
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();
  


  const [getCyclesList, setCyclesList] = useState([]);

  const getCycleListData = async () => {

    const response = await api({
      url: 'staff/cycles',
      methode: "POST",
      data: {"status": "1"},
    });

    console.log("response===", response);
    

    if (response.status) {
		//dfdsfd

		setCyclesList(response.data);
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

<div class="table-responsive text-nowrap">
                  <table class="table table-bordered">
                    <thead class="table-dark">
                              <tr>
                                <th>S.No</th>
                                <th>Cycle No.</th>
                                <th>Stand</th>
                                <th>Status</th>
                              </tr>
                              </thead>
                              <tbody class="table-border-bottom-0">
                              {
                                getCyclesList.map((item, index) => {
                                  return (
                             
                                      <tr key={index}>
                                        <td> {index+1} </td>
                                        <td> {item.cycle_no} </td>
                                        <td> {item?.stand?.title} </td>
                                        <td> 
                                            {item.status === 2 ? 
                                            <span class="badge bg-label-warning me-1">On Road</span>
                                            :
                                            <span class="badge bg-label-success me-1">In Stock</span>
                                            
                                        } 
                                            
                                            </td>
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

export default CyclesList;
