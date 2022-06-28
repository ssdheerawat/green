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
  const [IsLoad, setIsLoad] = useState(false);
  

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
<div className="card darkcard"><div className="card-header"><h3 className="card-title form-title"><i className="tf-icons bx bx-cycling"></i> Cycles List</h3>  </div></div>

<div className="table-responsive text-nowrap">
                  <table className="table table-bordered">
                    <thead className="table-dark">
                              <tr>
                                <th>S.No</th>
                                <th>Cycle No.</th>
                                <th>Stand</th>
                                <th>Status</th>
                              </tr>
                              </thead>
                              { IsLoad &&
                              <tbody className="table-border-bottom-0">
                              {
                                getCyclesList.map((item, index) => {
                                  return (
                             
                                      <tr key={index}>
                                        <td> {index+1} </td>
                                        <td> {item.cycle_no} </td>
                                        <td> {item?.stand?.title} </td>
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

                              {
                                getCyclesList.length === 0 && 
                                <tr><td className="text-center" colSpan={4}>No Record Found!</td></tr>
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

export default CyclesList;
