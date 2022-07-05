import React, {useState, useEffect} from "react";
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../api";
//import { Link } from "react-router-dom";

function CyclesListOnroad(props) {

    console.log("props",props);
	
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();
  


  const [getCyclesList, setCyclesList] = useState([]);
  const [IsLoad, setIsLoad] = useState(false);

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
<div className="card darkcard"><div className="card-header"><h3 className="card-title form-title"><i className="tf-icons bx bx-cycling"></i> Onroad cycles</h3>  </div></div>

<div className="table-responsive text-nowrap">
                  <table className="table table-bordered">
                    <thead className="table-dark">
                              <tr>
                                <th style={{width:50}}>S.No</th>
                                <th>Stand</th>
                                <th style={{width:100}}>By</th>
                                <th>Name</th>
                                <th style={{width:100}}>Cycle No.</th>
                                <th>Time</th>
                                <th style={{width:100}}>Minutes</th>
                              </tr>
                              </thead>
                              { IsLoad &&
                              <tbody className="table-border-bottom-0">
                              {
                                getCyclesList.map((item, index) => {

                                  //var end = item.DateFrom;

                                  //let startShiftTime = Moment(item.DateFrom);
                                  let startShiftTime = new Date(item.DateFrom);
                                  let endShiftTime = new Date();

                                  var difference  = endShiftTime - startShiftTime;
                                  
                                  var resultInMinutes = Math.round(difference / 60000)
                                  //console.log(resultInMinutes);
                                
                                  return (
                             
                                      <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            {item?.stand_from_data?.title} 
                                        </td>
                                        <td>{item?.issued_by_data?.staff_id}</td>
                                        <td>
                                            {item?.user?.fullname} 
                                            &nbsp;&nbsp;
                                            { 
                                              resultInMinutes >= 30 && <a href="tel:+91{item?.user?.phone}"><i className="tf-icons bx bx-phone-call"></i></a>
                                            }
                                          </td>
                                        
                                        <td>{item.cycle_id}</td>
                                        <td> 
                                            <Moment date={item.DateFrom} format="DD/MM/YYYY hh:mm A" />
                                            
                                            </td>
                                            <td>{resultInMinutes}</td>
                                      </tr>
                             
                                  )
                                })
                              }

                              {
                                getCyclesList.length === 0 && 
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

export default CyclesListOnroad;
