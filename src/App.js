import React from 'react';
import { Route, Routes } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
import Support from './Pages/Support';
import Documentation from './Pages/Documentation';
import SelfAtendance from './Pages/SelfAtendance';
import Issue from './Pages/Issue';
import IssueApi from './Pages/IssueApi';
import Deposit from './Pages/Deposit';
import Transfer from './Pages/Transfer';
import Receive from './Pages/Receive';
import Login from './Pages/Login';


function App() {
  return (
    
    <div className="App">
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <Sidebar />

            <div className="layout-page">
              <Header />
              

              <div className="content-wrapper">

          

                

                
             
                    <Routes>
                      
                        <Route exact path="/" element={<Login />} />
                   
                        <Route exact path="self-atendance" element={<SelfAtendance />} />
                        <Route exact path="issue" element={<Issue />} />
                        <Route exact path="issueapi" element={<IssueApi />} />
                        <Route exact path="deposit" element={<Deposit />} />
                        <Route exact path="transfer" element={<Transfer />} />
                        <Route exact path="receive" element={<Receive />} />
                        

                        <Route exact path="green" element={<Login />} />
                        <Route exact path="green/dashboard" element={<Dashboard />} />
                        <Route exact path="dashboard" element={<Dashboard />} />
                        <Route exact path="support" element={<Support />} />
                        <Route exact path="documentation" element={<Documentation />} />
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

