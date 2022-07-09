import React, {useState, useEffect} from "react";
//import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../api";
import Moment from 'react-moment';


function LoginReport(props) {

    console.log("props",props);
	
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();
  


  const [Records, setRecords] = useState([]);
  const [IsLoad, setIsLoad] = useState(false);

  const getCycleListData = async () => {

    const response = await api({
      url: 'staff/loginlog',
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

<div className="card darkcard"><div className="card-header"><h3 className="card-title form-title"><i className="tf-icons bx bx-cycling"></i> Log in Log out report  </h3></div></div>

<div className="table-responsive text-nowrap">
                  <table className="table table-bordered standsList">
                    <thead className="table-dark">
                              <tr>
                                <th>S.No</th>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Action</th>
                                <th>Time</th>
                              </tr>
                              </thead>
                              { IsLoad &&
                              <tbody className="table-border-bottom-0">
                              {
                                Records.map((item, index) => {
                                  return (
                                      <tr key={index} className={"status"}>
                                        <td>{index+1} </td>
                                        <td>{item.type}</td>
                                        <td>{item.title}</td>
                                        <td>{item.action}</td>
                                        <td> <Moment date={item.created_at} format="hh:mm A" /></td>
                                      </tr>
                                  )
                                })
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

export default LoginReport;
