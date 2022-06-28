import React, {useState, useEffect} from "react";
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../api";


function StaffList(props) {

    console.log("props",props);
	
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();
  


  const [Records, setRecords] = useState([]);
  const [IsLoad, setIsLoad] = useState(false);

  const getCycleListData = async () => {

    const response = await api({
      url: 'staff/staff',
      methode: "POST",
      data: {"status": "1"},
    });

    console.log("response===", response);
    

    if (response.status) {
		//dfdsfd

		setRecords(response.data);
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

<div className="card darkcard"><div className="card-header"><h3 className="card-title form-title"><i className="tf-icons bx bx-cycling"></i> Staff OnDuty  </h3></div></div>

<div className="table-responsive text-nowrap">
                  <table className="table table-bordered standsList">
                    <thead className="table-dark">
                              <tr>
                                <th>S.No</th>
                                <th>Stand</th>
                                <th>Name</th>
                                <th>Time</th>
      
                              </tr>
                              </thead>
                              { IsLoad &&
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

                                  let status = 0;

                                  if(item.out_time === "" || item.out_time=== null) {
                                    status = 1;
                                  }
                                  else {
                                    status = 2;
                                  }





                                  return (
                             
                                      <tr key={index} className={"status" + status + " " + udate}>
                                        <td> {index+1} </td>
                                        <td> {item.stand.short_title} </td>
                                        <td> {item.staff.fullname} - {item.staff.staff_id} </td>
                                       
                                        <td> <Moment date={item.updated_at} format="DD/MM/YYYY hh:mm A" /></td>
                                       
                                        
                                      </tr>
                             
                                  )
                                })
                              }

                              {
                                Records.length === 0 && 
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

export default StaffList;
