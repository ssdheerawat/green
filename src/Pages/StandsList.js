import React, {useState, useEffect} from "react";
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../api";


function StandsList(props) {

    console.log("props",props);
	
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();
  


  const [Records, setRecords] = useState([]);

  const getCycleListData = async () => {

    const response = await api({
      url: 'staff/stands',
      methode: "POST",
      data: {"status": "1"},
    });

    console.log("response===", response);
    

    if (response.status) {
		//dfdsfd

		setRecords(response.data);
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

<div className="card darkcard"><div className="card-header"><h3 className="card-title form-title"><i className="tf-icons bx bx-cycling"></i> Stand Status  </h3></div></div>

<div className="table-responsive text-nowrap">
                  <table className="table table-bordered standsList">
                    <thead className="table-dark">
                              <tr>
                                <th>S.No</th>
                                <th>Stand Name</th>
                                <th>Short Name</th>
                                <th>Status</th>
                                <th>Date</th>
      
                              </tr>
                              </thead>
                              <tbody className="table-border-bottom-0">
                              {
                                Records.map((item, index) => {

                                  var today = new Date().toLocaleDateString('en-CA');
                                  var today2 = new Date(item.updated_at).toLocaleDateString('en-CA');
                                  console.log(today +"  "+ today2);
                                  let udate = '';
                                  if(today2 < today) {
                                     udate = 'yesterday';
                                  }
                                  else {
                                     udate = 'today';
                                  }



                                  return (
                             
                                      <tr key={index} className={"status" + item.status + " " + udate}>
                                        <td> {index+1} </td>
                                        <td> {item.title} </td>
                                        <td> {item.short_title} </td>
                                        <td> 
                                      

<div>
      {(() => {
        if (item.status === 2 ) {
          return (
            <div>Close</div>
          )
        } else if (item.status === 1 ) {
          return (
            <div>Open</div>
          )
        } else {
          return (
            <div>N/A</div>
          )
        }
      })()}
      </div>
                                          
                                         </td>
                                        <td> <Moment date={item.updated_at} format="DD/MM/YYYY hh:mm A" /></td>
                                       
                                        
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

export default StandsList;
