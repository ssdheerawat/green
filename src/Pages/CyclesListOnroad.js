import React, {useState, useEffect} from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../api";


function CyclesListOnroad(props) {

    console.log("props",props);
	
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();
  


  const [getCyclesList, setCyclesList] = useState([]);

  const getCycleListData = async () => {

    const response = await api({
      url: 'staff/cycles/onroad',
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

<div className="table-responsive text-nowrap">
                  <table className="table table-bordered">
                    <thead className="table-dark">
                              <tr>
                                <th>S.No</th>
                                <th>Cycle No.</th>
                                <th>Stand</th>
                                <th>Group</th>
                                <th>Status</th>
                              </tr>
                              </thead>
                              <tbody className="table-border-bottom-0">
                              {
                                getCyclesList.map((item, index) => {
                                  return (
                             
                                      <tr key={index}>
                                        <td> {index+1} </td>
                                        <td> {item.cycle_id} </td>
                                        <td> {item?.stand_from_data?.title} </td>
                                        <td> {item?.stand_from_data?.group?.title} </td>
                                        <td> 
                                            {item.status === 2 ? 
                                            <span className="badge bg-label-warning me-1">On Road</span>
                                            :
                                            <span className="badge bg-label-success me-1">In Stock</span>
                                            
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

export default CyclesListOnroad;
