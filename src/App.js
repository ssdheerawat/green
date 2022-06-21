import React from 'react';
import { Route, Routes } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
//import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';

import SelfAtendance from './Pages/SelfAtendance';
import Issue from './Pages/Issue';
import IssueApi from './Pages/IssueApi';
import Deposit from './Pages/Deposit';
import Transfer from './Pages/Transfer';
import Receive from './Pages/Receive';
import StandInOut from './Pages/StandInOut';
import AppLinkShare from './Pages/AppLinkShare';
import CyclesList from './Pages/CyclesList';
import CyclesListOnroad from './Pages/CyclesListOnroad';
import TransactionList from './Pages/TransactionList';

import Login from './Pages/Login';
import ChangePassword from './Pages/ChangePassword';
import ForgotPassword from './Pages/ForgotPassword';


function App() {
  return (
    
    <div className="App">
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
          

            <div className="layout-page">
              <Header />
              

              <div className="content-wrapper">

          

                

                
             
                    <Routes>
                      
                      
                   
                        <Route exact path="green/self-atendance" element={<SelfAtendance />} />
                        <Route exact path="green/issue" element={<Issue />} />
                        <Route exact path="green/issueapi" element={<IssueApi />} />
                        <Route exact path="green/deposit" element={<Deposit />} />
                        <Route exact path="green/transfer" element={<Transfer />} />
                        <Route exact path="green/receive" element={<Receive />} />
                        <Route exact path="green/stand-inout" element={<StandInOut />} />
                        <Route exact path="green/app-link" element={<AppLinkShare />} />
                        <Route exact path="green/onroad" element={<CyclesListOnroad />} />
                        <Route exact path="green/cycles" element={<CyclesList />} />
                        <Route exact path="green/change-password" element={<ChangePassword />} />
                        <Route exact path="green/forgot-password" element={<ForgotPassword />} />
                        <Route exact path="green/transaction" element={<TransactionList />} />
                        

                        <Route exact path="green" element={<Login />} />
                        <Route exact path="/green/dashboard" element={<Dashboard />} />
                   
                        
                        <Route
                          path="*"
                          element={
                            <main style={{ padding: "1rem" }}>
                              <p>There's nothing here!</p>
                            </main>
                          }
                        />
                    </Routes>
                
              </div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
}

//const Dashboard1= () => <h2>You are in the Dashboard</h2>
//const Profile= () => <h2>You are in the Profile</h2>

export default App;

