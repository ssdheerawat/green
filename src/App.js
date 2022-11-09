import React from 'react';
import { Route, Routes } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
//import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';

import SelfAtendance from './Pages/SelfAtendance';
import Exchange from './Pages/Exchange';
import ExchangeAPI from './Pages/ExchangeAPI';
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
import StandsList from './Pages/StandsList';
import StaffList from './Pages/StaffList';
import QrCheck from './Pages/QrCheck';
import Summary from './Pages/Summary';
import LoginReport from './Pages/LoginReport';

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
                      
                      
                        <Route exact path="/" element={<Login />} />
                        <Route exact path="qr-check" element={<QrCheck />} />
                        <Route exact path="self-atendance" element={<SelfAtendance />} />
                        <Route exact path="exchange" element={<Exchange />} />
                        <Route exact path="exchangeapi" element={<ExchangeAPI />} />
                        <Route exact path="issue" element={<Issue />} />
                        <Route exact path="issueapi" element={<IssueApi />} />
                        <Route exact path="deposit" element={<Deposit />} />
                        <Route exact path="transfer" element={<Transfer />} />
                        <Route exact path="receive" element={<Receive />} />
                        <Route exact path="stand-inout" element={<StandInOut />} />
                        <Route exact path="app-link" element={<AppLinkShare />} />
                        <Route exact path="onroad" element={<CyclesListOnroad />} />
                        <Route exact path="cycles" element={<CyclesList />} />
                        <Route exact path="change-password" element={<ChangePassword />} />
                        <Route exact path="forgot-password" element={<ForgotPassword />} />
                        <Route exact path="transaction" element={<TransactionList />} />
                        <Route exact path="stands" element={<StandsList />} />
                        <Route exact path="staff" element={<StaffList />} />
                        <Route exact path="summary" element={<Summary />} />
                        <Route exact path="login-report" element={<LoginReport />} />
                        

                        <Route exact path="login" element={<Login />} />
                        
                        <Route exact path="dashboard" element={<Dashboard />} />
                   
                        
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

