import React from 'react';
import { BrowserRouter, Route, Routes, Link, useParams } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
import Support from './Pages/Support';
import Documentation from './Pages/Documentation';

function App() {
  return (
    <div className="App">
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <Sidebar />

            <div className="layout-page">
              <Header />
              

              <div className="content-wrapper">

                <BrowserRouter>
             
                    <Routes>
                        <Route exact path="/" element={<Dashboard />} />
                   
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
                </BrowserRouter>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}