import React, { Component } from "react";
import {  BrowserRouter, Link  } from "react-router-dom";
//import { Link } from 'react-router';

import { Nav } from "react-bootstrap";

//import logo from "../../assets/img/reactlogo.png";

class Sidebar extends React.Component {
    render() { 
    return <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
        <BrowserRouter>
                

    
    <div className="app-brand demo">
      <a href="index.html" className="app-brand-link">
        <span className="app-brand-logo demo">
         
        </span>
        <span className="app-brand-text demo menu-text fw-bolder ms-2">GreenRide</span>
      </a>

      <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
              <i class="bx bx-chevron-left bx-sm align-middle"></i>
        </a>

     
    </div>

    <div className="menu-inner-shadow"></div>

    <ul className="menu-inner py-1">

    
     
      <li className="menu-item active">
        <Link to="/dashboard" onClick={this.forceUpdate} className="menu-link">
                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Dashboard</div>
        </Link>
      </li>

      <li className="menu-item">
        <Link to="/support" onClick={this.forceUpdate} className="menu-link">
            <i className="menu-icon tf-icons bx bx-support"></i>
            <div>Support</div>
        </Link>
      </li>
      <li className="menu-item">
        <Link to="/documentation" onClick={this.forceUpdate} className="menu-link">
            <i className="menu-icon tf-icons bx bx-file"></i>
            <div>Documentation</div>
        </Link>
      </li>

    </ul>
    </BrowserRouter>
  </aside>
    
    }
}

export default Sidebar;
