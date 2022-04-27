import React, {Component} from "react";
import { BrowserRouter, Route, Routes, Link, useParams } from "react-router-dom";


function Dashboard() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();

  return (
    <div>
      <table class="table dash-link-tbl table-bordered ">
			<tbody><tr>
				<td class="disabledClick">
					<a href="https://onlycard.in/green/public/admin/cycles/issue" class="dash-link">
					  <i class="nav-icon fas fa-bicycle"></i>
					  <p>Issue</p>
					</a>
				</td>
				<td class="disabledClick">
					<a href="https://onlycard.in/green/public/admin/cycles/deposit" class="dash-link">
					  <i class="nav-icon fa fa-handshake"></i>
					  <p>Deposit</p>
					</a>
				</td>
				<td>
					<a href="https://onlycard.in/green/public/admin/cycles/onroad" class="dash-link">
					  <i class="nav-icon fas fa-bicycle"></i>
					  <p>On Road</p>
					</a>
				</td>
			</tr>
			<tr>
				<td class="disabledClick">
					<a href="https://onlycard.in/green/public/admin/stocktransfers/transfer" class="dash-link">
					  <i class="nav-icon fas fas fa-exchange-alt"></i>
					  <p>Transfer</p>
					</a>
				</td>
				<td class="disabledClick">
					<a href="https://onlycard.in/green/public/admin/stocktransfers/receive" class="dash-link">
					  <i class="nav-icon fas fa-download"></i>
					  <p>Receive</p>
					</a>
				</td>
				<td>
					<a href="https://onlycard.in/green/public/admin/users/recharge" class="dash-link">
					  <i class="nav-icon fa fa-plus"></i>
					  <p>Recharge</p>
					</a>
				</td>
			</tr>
			<tr>
				<td>
					<a href="https://onlycard.in/green/public/admin/attendances/create" class="dash-link">
					  <i class="nav-icon fas fa-male"></i>
					  <p>Self Attendance</p>
					</a>
				</td>
				<td>
					<a href="https://onlycard.in/green/public/admin/transactions" class="dash-link">
					  <i class="nav-icon fas fa-book"></i>
					  <p>Transaction</p>
					</a>
				</td>
				<td>
					<a href="https://onlycard.in/green/public/admin/users/create" class="dash-link">
					  <i class="nav-icon fas fa-share-alt"></i>
					  <p>App Link</p>
					</a>
				</td>
			</tr>
			
			</tbody></table>
    </div>
  );
}

export default Dashboard;
